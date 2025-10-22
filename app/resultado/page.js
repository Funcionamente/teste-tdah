"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import FaixaDestaque from "@/components/FaixaDestaque";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ResultadoPage() {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [resultado, setResultado] = useState(null);

  // Captura o email da URL (enviado após o pagamento)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (email) {
      verificarPagamento(email);
    } else {
      setLoading(false);
    }
  }, []);

  // Verifica o status do pagamento e busca resultado correspondente
  async function verificarPagamento(email) {
    try {
      const { data: payment } = await supabase
        .from("payments")
        .select("status")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (payment?.status === "aprovado") {
        const { data: resultado } = await supabase
          .from("resultados_teste")
          .select("*")
          .eq("email", email)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (resultado) {
          setResultado(resultado);
        }
        setPaymentStatus("aprovado");
      } else {
        setPaymentStatus("pendente");
      }
    } catch (error) {
      console.error("Erro ao verificar pagamento:", error);
    } finally {
      setLoading(false);
    }
  }

  // Interpretação de acordo com a pontuação
  const getInterpretacao = (pontuacao) => {
    if (pontuacao <= 50) {
      return {
        nivel: "Baixa probabilidade",
        explicacao: "Você não possui indícios de TDAH.",
        recomendacao:
          "Caso discorde do resultado, procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada.",
        cor: "bg-green-600",
      };
    } else if (pontuacao <= 100) {
      return {
        nivel: "Indícios moderados",
        explicacao:
          "Você possui traços moderados de TDAH. Isso significa que alguns dos seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como distração, impulsividade ou dificuldade de foco.",
        recomendacao:
          "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmada, irá te indicar o melhor tratamento para o seu caso.",
        cor: "bg-yellow-500",
      };
    } else {
      return {
        nivel: "Alta probabilidade",
        explicacao:
          "Você possui fortes indícios de TDAH. Isso significa que os seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como desatenção, hiperatividade e impulsividade (inquietação, agitação, dificuldade de esperar a sua vez, falar excessivamente e interromper os outros).",
        recomendacao:
          "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmado TDAH, irá te indicar o melhor tratamento para o seu caso.",
        cor: "bg-red-600",
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg">
        Verificando seu pagamento...
      </div>
    );
  }

  if (paymentStatus !== "aprovado") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">
        <h1 className="text-3xl font-bold text-orange-400 mb-4">
          Pagamento Pendente
        </h1>
        <p className="text-lg max-w-md mb-6">
          Parece que seu pagamento ainda não foi confirmado. Assim que o
          Mercado Pago aprovar, você será redirecionado automaticamente para
          esta página com seu resultado.
        </p>
        <p className="text-sm opacity-70">
          Isso pode levar alguns minutos. Você também pode atualizar esta página
          em breve.
        </p>
      </div>
    );
  }

  if (!resultado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg">
        Nenhum resultado encontrado. Verifique se você usou o mesmo e-mail do
        pagamento.
      </div>
    );
  }

  const interpretacao = getInterpretacao(resultado.pontuacao);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl text-center"
      >
        <h1 className="text-3xl font-bold text-orange-400 mb-6">
          ✅ Resultado do seu Teste de Atenção e Foco (base OMS)
        </h1>

        <div className="bg-zinc-900 rounded-2xl shadow-lg p-8">
          <p className="text-2xl font-semibold mb-2">
            Sua pontuação: {resultado.pontuacao} de 150
          </p>
          <p className={`text-lg font-medium mb-4 ${interpretacao.cor} p-2 rounded-lg`}>
            {interpretacao.nivel}
          </p>

          <p className="text-base mb-4 text-gray-200">
            {interpretacao.explicacao}
          </p>
          <p className="text-base text-gray-300 italic mb-6">
            {interpretacao.recomendacao}
          </p>

          <div className="mt-8 text-left bg-zinc-800 p-6 rounded-xl">
            <h2 className="text-lg font-bold text-orange-400 mb-2">
              Faixas de Interpretação
            </h2>
            <p className="mb-1">
              <strong>0 a 50:</strong> Baixa probabilidade
            </p>
            <p className="mb-1">
              <strong>51 a 100:</strong> Indícios moderados
            </p>
            <p>
              <strong>101 a 150:</strong> Alta probabilidade
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-orange-400 mb-4">
              🎁 E-books Gratuitos
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ebooks/Explicando-o-TDAH.pdf"
                download
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition"
              >
                📘 Baixar E-book - Explicando o TDAH
              </a>
              <a
                href="/ebooks/Como-o-TDAH-Afeta-Relacionamentos.pdf"
                download
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition"
              >
                ❤️ Baixar E-book - Como o TDAH Afeta Relacionamentos
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <FaixaDestaque />
    </div>
  );
}
