"use client";

import { motion } from "framer-motion";

export default function ResultadoSimulado() {
  const pontuacao = 87;
  const total = 150;

  const getFaixa = (pontuacao) => {
    if (pontuacao <= 50) {
      return {
        titulo: "Baixa Probabilidade",
        cor: "#1db954",
        explicacao: "Você não possui indícios de TDAH.",
        recomendacao:
          "Caso discorde do resultado, procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada.",
      };
    } else if (pontuacao <= 100) {
      return {
        titulo: "Indícios Moderados",
        cor: "#ffb347",
        explicacao:
          "Você possui traços moderados de TDAH. Isso significa que alguns dos seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como distração, impulsividade ou dificuldade de foco.",
        recomendacao:
          "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmada, irá te indicar o melhor tratamento para o seu caso.",
      };
    } else {
      return {
        titulo: "Alta Probabilidade",
        cor: "#ff4c4c",
        explicacao:
          "Você possui fortes indícios de TDAH. Isso significa que os seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como desatenção, hiperatividade e impulsividade (inquietação, agitação, dificuldade de esperar a sua vez, falar excessivamente e interromper os outros).",
        recomendacao:
          "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmado TDAH, irá te indicar o melhor tratamento para o seu caso.",
      };
    }
  };

  const faixa = getFaixa(pontuacao);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#ffb347]"
      >
        ✅ Resultado do seu Teste de Atenção e Foco (base OMS)
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-[#1c1c1c] rounded-2xl shadow-xl p-6 max-w-xl w-full border border-[#2a2a2a]"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative flex items-center justify-center w-32 h-32 rounded-full"
            style={{
              background: `conic-gradient(${faixa.cor} ${(pontuacao / total) * 100}%, #333 0%)`,
            }}
          >
            <div className="absolute bg-[#0a0a0a] w-24 h-24 rounded-full flex flex-col items-center justify-center">
              <p className="text-xl font-bold text-[#ffb347]">
                {pontuacao}/{total}
              </p>
              <p className="text-xs text-gray-400">Sua pontuação</p>
            </div>
          </motion.div>

          <div className="text-center mt-6">
            <p className="text-lg font-semibold text-[#ffb347]">
              FAIXA: {faixa.titulo}
            </p>
            <p className="text-sm text-gray-300 mt-2">{faixa.explicacao}</p>
          </div>

          <div className="w-full mt-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-[#ff7a00] to-[#ffb347] rounded-xl p-4 text-black font-medium"
            >
              <p>🔸 PRÓXIMO PASSO:</p>
              <p className="text-sm mt-1">{faixa.recomendacao}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#222] border border-[#333] rounded-xl p-4"
            >
              <p className="text-[#ffb347] font-semibold">💡 REFLITA:</p>
              <p className="text-sm text-gray-300 mt-1">
                Analise seus hábitos. Se estes sintomas estão impactando
                significativamente sua rotina, o acompanhamento profissional é
                fundamental.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Barra de Faixas */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="mt-10 bg-[#111] p-5 rounded-xl"
        >
          <h3 className="text-[#ffb347] font-bold mb-4 text-center">
            📊 Faixas de Interpretação
          </h3>
        
          {/* Barra colorida dividida */}
          <div className="relative w-full h-4 rounded-full overflow-hidden mb-8 flex">
            <div className="flex-1 bg-[#1db954]" /> {/* Verde */}
            <div className="flex-1 bg-[#ffb347]" /> {/* Amarelo */}
            <div className="flex-1 bg-[#ff4c4c]" /> {/* Vermelho */}
        
            {/* Marcador da pontuação */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: `${(pontuacao / total) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-10 h-10 bg-[#ffb347] rounded-full flex items-center justify-center text-black font-bold shadow-lg border-2 border-[#0a0a0a]">
                {pontuacao}
              </div>
            </div>
          </div>
        
          <ul className="text-sm text-gray-300 space-y-2 mt-3">
            <li>
              <span className="text-[#1db954] font-semibold">0 a 50:</span>{" "}
              Baixa probabilidade — indica baixa tendência a sintomas relacionados ao
              TDAH.
            </li>
            <li>
              <span className="text-[#ffb347] font-semibold">51 a 100:</span>{" "}
              Indícios moderados — alguns sinais podem estar presentes; procure
              acompanhamento se os sintomas impactam sua rotina.
            </li>
            <li>
              <span className="text-[#ff4c4c] font-semibold">101 a 150:</span>{" "}
              Alta probabilidade — indica sinais significativos de TDAH; busque
              orientação profissional.
            </li>
          </ul>
        </motion.div>

      {/* Faixa Final */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400 text-sm">
          © 2025 Funcionamente — Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}
