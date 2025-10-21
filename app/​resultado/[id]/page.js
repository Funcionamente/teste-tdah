"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FaixaDestaque from "@/components/FaixaDestaque";

export default function ResultadoPage() {
  const [score, setScore] = useState(null);
  const [result, setResult] = useState({ faixa: "", explicacao: "", recomendacao: "" });

  useEffect(() => {
    const savedScore = localStorage.getItem("tdahScore");
    if (savedScore) {
      const total = parseInt(savedScore, 10);
      setScore(total);

      if (total <= 50) {
        setResult({
          faixa: "Baixa probabilidade de TDAH",
          explicacao: "Você não possui indícios de TDAH.",
          recomendacao: "Caso discorde do resultado, procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada.",
        });
      } else if (total <= 100) {
        setResult({
          faixa: "Indícios moderados de TDAH",
          explicacao:
            "Você possui traços moderados de TDAH. Isso significa que alguns dos seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como distração, impulsividade ou dificuldade de foco.",
          recomendacao:
            "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmada, irá te indicar o melhor tratamento para o seu caso.",
        });
      } else {
        setResult({
          faixa: "Alta probabilidade de TDAH",
          explicacao:
            "Você possui fortes indícios de TDAH. Isso significa que os seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como desatenção, hiperatividade e impulsividade (inquietação, agitação, dificuldade de esperar a sua vez, falar excessivamente e interromper os outros).",
          recomendacao:
            "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmado TDAH, irá te indicar o melhor tratamento para o seu caso.",
        });
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-orange-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✅ Resultado do seu Teste de Atenção e Foco (base OMS)
      </motion.h1>

      {score !== null ? (
        <motion.div
          className="bg-gray-800 text-white rounded-2xl p-8 shadow-xl w-full max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Sua pontuação: {score} de 150</h2>
          <p className="text-lg text-orange-400 font-medium mb-4">{result.faixa}</p>
          <p className="text-base text-gray-200 mb-4">{result.explicacao}</p>
          <p className="text-base text-gray-300 mb-6">{result.recomendacao}</p>

          <div className="border-t border-gray-700 pt-6 mt-4">
            <h3 className="text-xl font-semibold mb-2 text-orange-400">Faixas de Interpretação</h3>
            <div className="text-left text-sm text-gray-300 space-y-2">
              <p><strong>0 a 50:</strong> Baixa probabilidade — resultado indica baixa tendência a sintomas relacionados ao TDAH.</p>
              <p><strong>51 a 100:</strong> Indícios moderados — alguns sinais podem estar presentes. Reflita sobre seus hábitos e procure acompanhamento se impactam sua rotina.</p>
              <p><strong>101 a 150:</strong> Alta probabilidade — resultado aponta para sinais significativos de TDAH. É importante buscar orientação profissional.</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">📘 Seus e-books gratuitos</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="/ebooks/Explicando-o-TDAH.pdf"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300"
              >
                Baixar E-book - Explicando o TDAH
              </a>
              <a
                href="/ebooks/Como-o-TDAH-afeta-relacionamentos.pdf"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300"
              >
                Baixar E-book - Como o TDAH afeta relacionamentos
              </a>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-white mt-6">Carregando seu resultado...</p>
      )}

      <div className="mt-16 w-full">
        <FaixaDestaque />
      </div>
    </main>
  );
}
