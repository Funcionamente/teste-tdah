"use client";

import { motion } from "framer-motion";

export default function ResultadoPremium() {
  const pontuacao = 87;
  const total = 150;

  const getFaixa = (pontuacao) => {
    if (pontuacao <= 50) {
      return {
        titulo: "Baixa Probabilidade",
        cor: "#3DE374",
        bg: "from-green-400/20 to-green-900/10",
        explicacao: "Você não possui indícios de TDAH.",
        recomendacao:
          "Caso discorde do resultado, procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada.",
      };
    } else if (pontuacao <= 100) {
      return {
        titulo: "Indícios Moderados",
        cor: "#FFD369",
        bg: "from-yellow-400/20 to-yellow-900/10",
        explicacao:
          "Você possui traços moderados de TDAH. Isso significa que alguns dos seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como distração, impulsividade ou dificuldade de foco.",
        recomendacao:
          "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmada, irá te indicar o melhor tratamento para o seu caso.",
      };
    } else {
      return {
        titulo: "Alta Probabilidade",
        cor: "#FF6B6B",
        bg: "from-red-400/20 to-red-900/10",
        explicacao:
          "Você possui fortes indícios de TDAH. Isso significa que os seus comportamentos podem estar relacionados a sintomas típicos de TDAH, como desatenção, hiperatividade e impulsividade (inquietação, agitação, dificuldade de esperar a sua vez, falar excessivamente e interromper os outros).",
        recomendacao:
          "Procure um profissional de saúde mental (psiquiatra ou psicólogo) para uma avaliação mais aprofundada, que se confirmado TDAH, irá te indicar o melhor tratamento para o seu caso.",
      };
    }
  };

  const faixa = getFaixa(pontuacao);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0f] via-[#0a0a0d] to-[#000] text-white flex flex-col items-center px-4 py-10 relative overflow-hidden">
      {/* Fundo animado sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,180,90,0.08),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,90,120,0.08),_transparent_40%)] blur-3xl"></div>

      {/* Título */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-semibold text-center mb-10 bg-gradient-to-r from-[#FFD369] to-[#FF9F1C] bg-clip-text text-transparent drop-shadow-lg"
      >
        ✅ Resultado do seu Teste de Atenção e Foco (base OMS)
      </motion.h1>

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className={`relative backdrop-blur-xl bg-gradient-to-br ${faixa.bg} border border-white/10 shadow-2xl rounded-3xl p-8 max-w-xl w-full`}
      >
        {/* Animação suave de brilho */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
        />

        <div className="relative flex flex-col items-center">
          {/* Pontuação com efeito “pulse” */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative flex items-center justify-center w-36 h-36 rounded-full shadow-lg shadow-[#FFD369]/10"
            style={{
              background: `conic-gradient(${faixa.cor} ${(pontuacao / total) * 100}%, #1e1e1e 0%)`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bg-[#0d0d0f] w-28 h-28 rounded-full flex flex-col items-center justify-center border border-[#2a2a2a]"
            >
              <p
                className="text-2xl font-extrabold"
                style={{ color: faixa.cor }}
              >
                {pontuacao}/{total}
              </p>
              <p className="text-xs text-gray-400 mt-1">Sua pontuação</p>
            </motion.div>
          </motion.div>

          <div className="text-center mt-6 space-y-2">
            <p
              className="text-lg font-semibold tracking-wide"
              style={{ color: faixa.cor }}
            >
              FAIXA: {faixa.titulo}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              {faixa.explicacao}
            </p>
          </div>

          {/* Próximo passo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 w-full bg-gradient-to-r from-[#FF9F1C]/80 to-[#FFD369]/60 text-black rounded-2xl p-5 shadow-md"
          >
            <p className="font-bold">🔸 PRÓXIMO PASSO:</p>
            <p className="text-sm mt-2 text-[#1a1a1a] leading-relaxed">
              {faixa.recomendacao}
            </p>
          </motion.div>

          {/* Reflexão */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 w-full bg-white/5 border border-white/10 rounded-2xl p-5 shadow-inner"
          >
            <p className="font-semibold text-[#FFD369]">💡 REFLITA:</p>
            <p className="text-sm text-gray-300 mt-1 leading-relaxed">
              Analise seus hábitos. Se estes sintomas estão impactando
              significativamente sua rotina, o acompanhamento profissional é
              fundamental.
            </p>
          </motion.div>

          {/* Barra de faixa interpretativa */}
          <div className="mt-10 w-full">
            <h3 className="text-[#FFD369] font-bold mb-3 text-center">
              📊 Faixas de Interpretação
            </h3>
            <div className="w-full h-4 bg-[#222] rounded-full relative overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(pontuacao / total) * 100}%` }}
                transition={{ duration: 1.2 }}
                style={{ backgroundColor: faixa.cor }}
                className="h-4 rounded-full"
              />
              <span
                className="absolute top-[-8px] text-sm font-bold"
                style={{
                  left: `${(pontuacao / total) * 100}%`,
                  transform: "translateX(-50%)",
                  color: faixa.cor,
                }}
              >
                {pontuacao}
              </span>
            </div>

            <ul className="text-sm text-gray-300 space-y-2 mt-4 leading-relaxed">
              <li>
                <span className="text-[#3DE374] font-semibold">0 a 50:</span>{" "}
                Baixa probabilidade — indica baixa tendência a sintomas
                relacionados ao TDAH.
              </li>
              <li>
                <span className="text-[#FFD369] font-semibold">51 a 100:</span>{" "}
                Indícios moderados — alguns sinais podem estar presentes; procure
                acompanhamento se os sintomas impactam sua rotina.
              </li>
              <li>
                <span className="text-[#FF6B6B] font-semibold">101 a 150:</span>{" "}
                Alta probabilidade — indica sinais significativos de TDAH; busque
                orientação profissional.
              </li>
            </ul>
          </div>

          {/* E-books */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 text-center"
          >
            <h3 className="text-[#FFD369] font-bold text-lg mb-4">
              📘 E-books Recomendados
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="bg-gradient-to-r from-[#FF9F1C] to-[#FFD369] text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                📗 Baixar E-book – Explicando o TDAH
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-[#FF9F1C] to-[#FFD369] text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                ❤️ Baixar E-book – Como o TDAH Afeta Relacionamentos
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Rodapé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-12 text-center text-gray-500 text-sm"
      >
        © 2025 Funcionamente — Todos os direitos reservados.
      </motion.div>
    </div>
  );
}
