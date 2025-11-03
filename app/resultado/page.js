"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Resultado() {
  const [loading, setLoading] = useState(true);
  const [pontuacao, setPontuacao] = useState(null);
  const [faixa, setFaixa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [proximoPasso, setProximoPasso] = useState("");
  const [erro, setErro] = useState(null);

  const total = 150;

  useEffect(() => {
    async function fetchResultado() {
      try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("external_reference");

        if (!ref) {
          setErro("Sessão inválida. Tente novamente.");
          setLoading(false);
          return;
        }

        // 🔹 Buscar pagamento confirmado
        const { data: pagamento, error: pagamentoError } = await supabase
          .from("payments")
          .select("mp_payment_id, status, metadata")
          .eq("id", ref)
          .single();

        if (pagamentoError || !pagamento) {
          console.error(pagamentoError);
          setErro("Pagamento não encontrado ou inválido.");
          setLoading(false);
          return;
        }

        if (pagamento.status !== "approved") {
          setErro("Pagamento ainda não foi aprovado.");
          setLoading(false);
          return;
        }

        const email = pagamento.metadata?.email;
        if (!email) {
          setErro("Não foi possível identificar o e-mail do teste.");
          setLoading(false);
          return;
        }

        // 🔹 Buscar resultado do teste pelo e-mail
        const { data: resultado, error: resultadoError } = await supabase
          .from("resultados_teste")
          .select("*")
          .eq("email", email)
          .order("criado_em", { ascending: false })
          .limit(1)
          .single();

        if (resultadoError || !resultado) {
          console.error(resultadoError);
          setErro("Resultado do teste não encontrado.");
          setLoading(false);
          return;
        }

        // 🔹 Calcular faixa e descrições
        const score = Number(resultado.pontuacao) || 0;
        setPontuacao(score);

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
        console.error(err);
        setErro("Ocorreu um erro ao carregar os dados.");
        setLoading(false);
      }
    }

    fetchResultado();
  }, []);

  // 🌀 LOADING
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="animate-spin border-4 border-[#ffb347] border-t-transparent rounded-full w-10 h-10 mb-4"></div>
        <p>Carregando seu resultado...</p>
      </div>
    );
  }

  // ⚠️ ERRO
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

  // ✅ RESULTADO
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

        {/* Barra de faixas */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="mt-10 bg-[#111] p-5 rounded-xl"
        >
          <h3 className="text-[#ffb347] font-bold mb-4 text-center">
            📊 Faixas de Interpretação
          </h3>

          <div className="relative w-full h-4 rounded-full overflow-hidden mb-8 flex">
            <div className="flex-1 bg-[#1db954]" />
            <div className="flex-1 bg-[#ffb347]" />
            <div className="flex-1 bg-[#ff4c4c]" />

            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: posicao,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-10 h-10 bg-[#ffffff] rounded-full flex items-center justify-center text-black font-bold shadow-lg border-2 border-[#0a0a0a]">
                {pontuacao}
              </div>
            </div>
          </div>

          <ul className="text-sm text-gray-300 space-y-2 mt-3">
            <li>
              <span className="text-[#1db954] font-semibold">0 a 50:</span> Baixa probabilidade — indica baixa tendência a sintomas de TDAH.
            </li>
            <li>
              <span className="text-[#ffb347] font-semibold">51 a 100:</span> Indícios moderados — alguns sinais podem estar presentes.
            </li>
            <li>
              <span className="text-[#ff4c4c] font-semibold">101 a 150:</span> Alta probabilidade — indica sinais significativos de TDAH.
            </li>
          </ul>
        </motion.div>

        {/* E-books */}
        <motion.div
          className="mt-12 p-6 bg-gray-50 rounded-2xl shadow-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🎁 Seus E-books Exclusivos
          </h2>
          <p className="text-gray-600 mb-6">
            Clique abaixo para baixar gratuitamente seus materiais de apoio:
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="/ebooks/Explicando-o-TDAH.pdf"
              download
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
            >
              📘 Baixar E-book – Explicando o TDAH
            </a>

            <a
              href="/ebooks/Como-o-TDAH-Afeta-Relacionamentos.pdf"
              download
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow hover:bg-purple-700 transition"
            >
              ❤️ Baixar E-book – Como o TDAH Afeta Relacionamentos
            </a>
          </div>
        </motion.div>

        {/* Rodapé */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 bg-gradient-to-r from-[#ffb347] to-[#ffcc70] text-black font-semibold p-6 rounded-xl shadow-lg"
        >
          <p>
            Lembre-se: este teste é apenas uma triagem inicial baseada em critérios da OMS. 
            Somente um profissional qualificado pode oferecer um diagnóstico preciso.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-[#1a1a1a] text-[#ffb347] px-6 py-2 rounded-lg font-bold hover:bg-[#333] transition"
          >
            Refazer o Teste
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
