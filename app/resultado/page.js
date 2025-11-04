"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ResultadoIntermediario() {
  const [status, setStatus] = useState("loading");
  const [mensagem, setMensagem] = useState("Verificando status do pagamento...");
  const router = useRouter();

  useEffect(() => {
    async function verificarPagamento() {
      try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");

        if (!ref) {
          setStatus("erro");
          setMensagem("Referência inválida. Tente novamente.");
          return;
        }

        console.log("🔍 Verificando pagamento ref:", ref);

        // Consulta o status do pagamento na Supabase
        const { data: pagamento, error } = await supabase
          .from("payments")
          .select("status")
          .eq("id", ref)
          .single();

        if (error || !pagamento) {
          setStatus("erro");
          setMensagem("Pagamento não encontrado.");
          console.error(error);
          return;
        }

        console.log("📊 Status do pagamento:", pagamento.status);

        if (pagamento.status === "approved") {
          setMensagem("Pagamento aprovado! Redirecionando para o resultado...");
          setTimeout(() => {
            router.push(`/resultado-final?ref=${ref}`);
          }, 1500);
        } else if (pagamento.status === "pending") {
          setStatus("pendente");
          setMensagem("Pagamento ainda pendente. Aguarde a confirmação.");
        } else {
          setStatus("erro");
          setMensagem("Pagamento não aprovado ou cancelado.");
        }
      } catch (err) {
        console.error(err);
        setStatus("erro");
        setMensagem("Erro ao verificar status do pagamento.");
      }
    }

    verificarPagamento();

    // Tentativas adicionais para o caso do MP demorar a aprovar
    const intervalo = setInterval(() => verificarPagamento(), 8000);
    return () => clearInterval(intervalo);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white text-center p-6">
      {status === "loading" && (
        <>
          <div className="animate-spin border-4 border-[#ffb347] border-t-transparent rounded-full w-10 h-10 mb-4"></div>
          <p>{mensagem}</p>
        </>
      )}

      {status === "pendente" && (
        <>
          <p className="text-yellow-400 text-lg mb-2">⏳ {mensagem}</p>
          <p className="text-gray-400 text-sm">Essa página vai atualizar automaticamente.</p>
        </>
      )}

      {status === "erro" && (
        <>
          <p className="text-red-500 text-lg font-semibold mb-3">⚠️ {mensagem}</p>
          <a
            href="/"
            className="bg-[#ffb347] px-4 py-2 rounded-lg text-black font-bold"
          >
            Voltar ao Início
          </a>
        </>
      )}
    </div>
  );
}
