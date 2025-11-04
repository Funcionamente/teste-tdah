"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResultadoIntermediario() {
  const [mensagem, setMensagem] = useState("Verificando pagamento...");
  const router = useRouter();

  useEffect(() => {
    async function verificarPagamento() {
      try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("external_reference");
        const status = params.get("status");

        if (!ref) {
          setMensagem("Referência de pagamento inválida.");
          return;
        }

        // Se o Mercado Pago já devolveu status=approved, podemos confiar
        if (status === "approved") {
          router.push(`/resultado-final?external_reference=${ref}`);
          return;
        }

        // Buscar o status na Supabase, caso o status na URL ainda seja pending
        const { data: pagamento, error } = await supabase
          .from("payments")
          .select("status")
          .eq("id", ref)
          .single();

        if (error || !pagamento) {
          setMensagem("Pagamento não encontrado.");
          return;
        }

        if (pagamento.status === "approved") {
          router.push(`/resultado-final?external_reference=${ref}`);
        } else if (pagamento.status === "pending") {
          setMensagem("Seu pagamento ainda está sendo processado...");
        } else {
          setMensagem("O pagamento não foi aprovado. Tente novamente.");
        }
      } catch (err) {
        console.error(err);
        setMensagem("Erro ao verificar o pagamento.");
      }
    }

    verificarPagamento();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white text-center px-6">
      <div className="animate-spin border-4 border-[#ffb347] border-t-transparent rounded-full w-10 h-10 mb-4"></div>
      <p className="text-lg font-medium">{mensagem}</p>
      <p className="text-sm text-gray-400 mt-3">Por favor, aguarde alguns instantes...</p>
    </div>
  );
}
