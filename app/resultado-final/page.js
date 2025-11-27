"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";​
import Link from "next/link";

export default function ResultadoFinal() {
  const [loading, setLoading] = useState(true);
  const [pontuacao, setPontuacao] = useState(null);
  const [faixa, setFaixa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [proximoPasso, setProximoPasso] = useState("");
  const [erro, setErro] = useState(null);

  const total = 150;

  useEffect(() => {
    console.log("🚀 Página resultado-final montada");

    async function fetchResultado() {
      try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref") || params.get("external_reference");
        console.log("🔎 Ref encontrado:", ref);

        if (!ref) {
          setErro("Sessão inválida. Tente novamente.");
          setLoading(false);
          return;
        }

        // ✅ Criar o Supabase client dentro do client-side
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          console.error("❌ Variáveis NEXT_PUBLIC_SUPABASE_URL/ANON_KEY ausentes!");
          setErro("Erro de configuração do servidor.");
          setLoading(false);
          return;
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Buscar pagamento
        console.log("💾 Buscando pagamento no Supabase...");
        const { data: pagamento, error: pagamentoError } = await supabase
          .from("payments")
          .select("id, mp_payment_id, status")
          .or(`id.eq.${ref},mp_payment_id.eq.${ref}`)
          .maybeSingle();

        console.log("🧾 Pagamento retornado:", pagamento);

        if (pagamentoError) {
          console.error("❌ Erro pagamento:", pagamentoError);
          setErro("Erro ao verificar pagamento.");
          setLoading(false);
          return;
        }

        if (!pagamento) {
          setErro("Pagamento não encontrado.");
          setLoading(false);
          return;
        }

        if (pagamento.status !== "approved") {
          console.log("⏳ Pagamento pendente, tentando novamente em 3s...");
          setTimeout(() => window.location.reload(), 3000);
          return;
        }

        // Buscar resultado do teste
        console.log("📊 Buscando resultado do teste vinculado...");
        const { data: resultado, error: resultadoError } = await supabase
          .from("resultados_teste")
          .select("*")
          .or(`ref_pagamento.eq.${ref},mp_payment_id.eq.${ref}`)
          .maybeSingle();

        console.log("📄 Resultado retornado:", resultado);

        if (resultadoError) {
          console.error("❌ Erro resultado:", resultadoError);
          setErro("Erro ao buscar resultado do teste.");
          setLoading(false);
          return;
        }

        if (!resultado) {
          setErro("Resultado não encontrado para este pagamento.");
          setLoading(false);
          return;
        }

        // Calcular e exibir
        const score = Number(resultado.pontuacao) || 0;
        setPontuacao(score);
        console.log("🎯 Pontuação carregada:", score);

        if (score <= 50) {
          setFaixa("Baixa probabilidade");
          setDescricao(
            "Seus resultados indicam baixa tendência a sintomas de TDAH. Continue mantendo hábitos saudáveis e boas rotinas."
          );
          setProximoPasso("Mantenha suas práticas e busque equilíbrio em sua rotina.");
        } else if (score <= 100) {
          setFaixa("Indícios Moderados");
          setDescricao(
            "Você possui traços moderados de TDAH. Alguns sintomas podem afetar sua concentração em determinadas situações."
          );
          setProximoPasso(
            "Procure um profissional de saúde mental (psicólogo) para avaliação e possíveis orientações."
          );
        } else {
          setFaixa("Alta Probabilidade");
          setDescricao(
            "Seu resultado apresenta alta probabilidade de TDAH. É fortemente recomendado procurar um profissional especializado."
          );
          setProximoPasso("Agende uma consulta com um especialista em saúde mental.");
        }

        setLoading(false);
      } catch (err) {
        console.error("💥 Erro geral no resultado-final:", err);
        setErro("Ocorreu um erro ao carregar os dados.");
        setLoading(false);
      }
    }

    fetchResultado();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="animate-spin border-4 border-[#ffb347] border-t-transparent rounded-full w-10 h-10 mb-4"></div>
        <p>Carregando seu resultado...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <p className="text-red-500 font-semibold mb-4">{erro}</p>
        <Link href="/" className="bg-[#ffb347] px-4 py-2 rounded-lg text-black font-bold">
          Voltar
        </Link>
      </div>
    );
  }

  const posicao =
    total > 0 && pontuacao !== null
      ? `${Math.min((pontuacao / total) * 100, 100)}%`
      : "0%";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl w-full bg-[#1a1a1a] p-8 rounded-2xl shadow-lg text-center"
      >
        <h1 className="text-2xl font-bold text-[#ffb347] mb-6 flex items-center justify-center">
          <CheckCircle2 className="text-[#1db954] mr-2" size={28} />
          Resultado do seu Teste de Atenção e Foco (base OMS)
        </h1>

        <div className="bg-gradient-to-br from-[#ffb347] to-[#ffcc70] text-black font-bold rounded-full w-28 h-28 mx-auto flex items-center justify-center text-xl mb-4 shadow-xl">
          {pontuacao}/{total}
        </div>
        <h2 className="font-semibold text-[#ffb347] mb-2">FAIXA: {faixa}</h2>
        <p className="text-gray-300 mb-6">{descricao}</p>

        <div className="bg-[#ffb347]/20 border border-[#ffb347] p-4 rounded-lg text-[#ffb347] font-semibold mb-6">
          <p>{proximoPasso}</p>
        </div>
      </motion.div>
    </div>
  );
}
