"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function ResultadoContent() {
  const [status, setStatus] = useState("loading");
  const [mensagem, setMensagem] = useState("Verificando status do pagamento...");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function verificarPagamento() {
      try {
        // ✅ Aceita ambos os parâmetros: ?ref=... ou ?external_reference=...
        const ref =
          searchParams.get("ref") ||
          searchParams.get("external_reference");
        const statusMP = searchParams.get("status");

        if (!ref) {
          setStatus("erro");
          setMensagem("Referência inválida. Tente novamente.");
          return;
        }

        console.log("🔍 Verificando pagamento ref:", ref);

        // 🔎 Consulta o status do pagamento na Supabase
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
          setMensagem("✅ Pagamento aprovado! Redirecionando para o resultado...");
          setStatus("aprovado");
          setTimeout(() => {
            router.push(`/resultado-final?ref=${ref}`);
          }, 1500);
        } else if (pagamento.status === "pending" || statusMP === "pending") {
          setStatus("pendente");
          setMensagem("⏳ Pagamento ainda pendente. Aguarde a confirmação.");
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

    // 🔁 Revalida a cada 8s (Mercado Pago pode demorar)
    const intervalo = setInterval(() => verificarPagamento(), 8000);

    // ⚙️ Fallback adicional após 40 segundos
    const fallback = setTimeout(async () => {
      try {
        const ref =
          searchParams.get("ref") ||
          searchParams.get("external_reference");
        if (!ref) return;

        const { data: pagamento } = await supabase
          .from("payments")
          .select("status")
          .eq("id", ref)
          .single();

        if (pagamento?.status === "approved") {
          console.log("🧭 Fallback: pagamento aprovado detectado após demora.");
          setStatus("aprovado");
          setMensagem("✅ Detectamos seu pagamento aprovado! Carregando seu resultado...");
          setTimeout(() => {
            router.push(`/resultado-final?ref=${ref}`);
          }, 2500);
        }
      } catch (err) {
        console.error("Erro no fallback de verificação tardia:", err);
      }
    }, 40000);

    return () => {
      clearInterval(intervalo);
      clearTimeout(fallback);
    };
  }, [router, searchParams]);

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
          <p className="text-yellow-400 text-lg mb-2">{mensagem}</p>
          <p className="text-gray-400 text-sm">
            Essa página vai atualizar automaticamente.
          </p>
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

      {status === "aprovado" && (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-pulse mb-4 text-green-400 text-3xl">🎉</div>
          <p className="text-green-400 text-lg font-semibold">{mensagem}</p>
          <p className="text-gray-400 text-sm mt-2">
            Você será redirecionado automaticamente em instantes...
          </p>
        </div>
      )}
    </div>
  );
}

export default function ResultadoIntermediario() {
  // ✅ Corrige o erro de build envolvendo o hook dentro de um Suspense
  return (
    <Suspense fallback={<div className="text-white p-8 text-center">Carregando...</div>}>
      <ResultadoContent />
    </Suspense>
  );
}
