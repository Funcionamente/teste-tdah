"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FaixaDestaque from "@/components/FaixaDestaque";

export default function ResultadoPage() {
  const [resultado, setResultado] = useState(null);

  // Simulação de dados de resultado
  useEffect(() => {
    const pontuacao = 87; // 🔸 Exemplo fictício
    let faixa, explicacao, recomendacao;

    if (pontuacao <= 50) {
      faixa = "Baixa probabilidade";
      explicacao = "Você não possui indícios de TDAH.";
      recomendacao = "Caso discorde do resultado, procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada.";
    } else if (pontuacao <= 100) {
      faixa = "Indícios moderados";
      explicacao = "Você possui traços moderados de TDAH. Isso significa que alguns dos seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como distração, impulsividade ou dificuldade de foco.";
      recomendacao = "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmada, irá te indicar o melhor tratamento para o seu caso.";
    } else {
      faixa = "Alta probabilidade";
      explicacao = "Você possui fortes indícios de TDAH. Isso significa que os seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como desatenção, hiperatividade e impulsividade (inquietação, agitação, dificuldade de esperar a sua vez, falar excessivamente e interromper os outros).";
      recomendacao = "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmado TDAH, irá te indicar o melhor tratamento para o seu caso.";
    }

    setResultado({ pontuacao, faixa, explicacao, recomendacao });
  }, []);

  if (!resultado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#0a0a0a]">
        <p>Carregando resultado...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        className="text-3xl font-bold text-center text-orange-400 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✅ Resultado do seu Teste de Atenção e Foco (base OMS)
      </motion.h1>

      <motion.div
        className="bg-[#1c1c1c] rounded-2xl p-8 max-w-xl w-full text-center shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-orange-300 mb-2">
          Sua pontuação: {resultado.pontuacao} de 150
        </h2>
        <p className="text-lg font-medium mb-4">
          Faixa: <span className="text-orange-400">{resultado.faixa}</span>
        </p>

        <p className="mb-4 text-gray-200">{resultado.explicacao}</p>
        <p className="mb-6 text-gray-300">{resultado.recomendacao}</p>

        <div className="border-t border-gray-700 my-6"></div>

        <div className="text-left">
          <h3 className="text-xl font-semibold text-orange-400 mb-3 text-center">
            📊 Faixas de Interpretação
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li><b>0 a 50:</b> Baixa probabilidade — Resultados indicam baixa tendência a sintomas relacionados ao TDAH.</li>
            <li><b>51 a 100:</b> Indícios moderados — Alguns sinais podem estar presentes. Reflita sobre seus hábitos e procure acompanhamento se os sintomas impactam sua rotina.</li>
            <li><b>101 a 150:</b> Alta probabilidade — Resultados apontam para sinais significativos de TDAH. É importante buscar orientação profissional.</li>
          </ul>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        <h3 className="text-xl font-semibold text-orange-400 mb-3 text-center">
          🎁 Seus E-books Gratuitos
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#"
            className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-6 py-3 rounded-full shadow-md"
          >
            📘 Baixar E-book - Explicando o TDAH
          </a>
          <a
            href="#"
            className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-6 py-3 rounded-full shadow-md"
          >
            ❤️ Baixar E-book - Como o TDAH Afeta Relacionamentos
          </a>
        </div>
      </motion.div>

      <FaixaDestaque />
    </div>
  );
}
