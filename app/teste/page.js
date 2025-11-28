"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import FaixaDestaque from "@/components/FaixaDestaque";

const perguntas = [
  "Você tem dificuldade em manter a atenção em tarefas ou atividades prolongadas?",
  "Costuma cometer erros por descuido em tarefas simples?",
  "Tem dificuldade em organizar suas atividades diárias?",
  "Evita tarefas que exigem esforço mental prolongado?",
  "Perde objetos importantes com frequência?",
  "É facilmente distraído por estímulos externos?",
  "Tem dificuldade em seguir instruções detalhadas até o fim?",
  "Costuma interromper os outros quando estão falando?",
  "Fala excessivamente em situações sociais?",
  "Se sente inquieto ou tem dificuldade em relaxar?",
  "Sente-se impaciente em filas ou em situações que exigem espera?",
  "Tem dificuldade em gerenciar o tempo?",
  "Esquece compromissos, prazos ou reuniões com frequência?",
  "Tem a sensação de que sua mente está “sempre ligada”?",
  "Se sente sobrecarregado por tarefas simples do dia a dia?",
  "Tem dificuldade em concluir o que começou?",
  "Fica facilmente entediado quando não há estímulos novos?",
  "Costuma procrastinar tarefas importantes?",
  "Se envolve em várias atividades ao mesmo tempo e não finaliza?",
  "Sente-se impulsivo em decisões do cotidiano?",
  "Tem dificuldades para ouvir com atenção quando alguém fala com você?",
  "Sente necessidade constante de se mover, mesmo em momentos de descanso?",
  "Fica irritado quando é interrompido em algo que está fazendo?",
  "Tem dificuldade em manter a motivação em projetos longos?",
  "Percebe que sua atenção muda rapidamente entre ideias ou tarefas?",
  "Costuma esquecer onde guardou objetos importantes?",
  "Sente-se ansioso ou agitado sem motivo aparente?",
  "Tem dificuldade em lidar com frustrações?",
  "Age antes de pensar nas consequências?",
  "Se sente frequentemente desorganizado(a) mentalmente?",
];

const opcoes = [
  { texto: "Nunca", valor: 0 },
  { texto: "Raramente", valor: 1 },
  { texto: "Às vezes", valor: 2 },
  { texto: "Frequentemente", valor: 3 },
  { texto: "Sempre", valor: 5 },
];

export default function TesteTDAH() {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [concluido, setConcluido] = useState(false);

  const progresso = ((indice + 1) / perguntas.length) * 100;

  const handleResposta = (valor) => {
    const novas = [...respostas];
    novas[indice] = valor;
    setRespostas(novas);
  };

  const handleProximo = () => {
    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
    } else {
      setConcluido(true);
    }
  };

  const handleVoltar = () => {
    if (indice > 0) setIndice(indice - 1);
  };

  const pontuacaoTotal = respostas.reduce((acc, val) => acc + (val ?? 0), 0);

  // 🔹 Função para salvar o resultado no Supabase
  const handleSalvarResultado = async (pontuacaoTotal) => {
    try {
      const refPagamento = "ref_" + Date.now();
      const resultadoData = {
        pontuacao: Number(pontuacaoTotal) || 0,
        interpretacao: null,
        id_pagamento: refPagamento,
        status_pagamento: "pendente",
        resultado_exibido: false,
      };

      let { data, error } = await supabase.from("resultados_teste").insert([resultadoData]);

      // 🔁 Se der erro na constraint, tenta com o status "pending"
      if (error && error.message?.includes("status_pagamento_check")) {
        console.warn("⚠️ Valor 'pendente' não aceito, tentando 'pending'...");
        resultadoData.status_pagamento = "pending";
        ({ data, error } = await supabase.from("resultados_teste").insert([resultadoData]));
      }

      if (error) {
        console.error("Erro ao salvar resultado:", error);
        alert("Não foi possível salvar seu resultado. Tente novamente.");
        return;
      }

      console.log("✅ Resultado salvo com sucesso:", data);
      window.location.href = `/checkout?ref=${refPagamento}`;
    } catch (err) {
      console.error("Erro inesperado ao salvar resultado:", err);
      alert("Erro inesperado ao salvar o resultado.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-950 text-white">
      {/* Barra de Progresso */}
      <div className="h-2 bg-neutral-800 w-full">
        <motion.div
          className="h-2 bg-gradient-to-r from-amber-400 to-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: `${progresso}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Título */}
      <div className="text-center mt-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-amber-400">
          Teste Interativo TDAH
        </h1>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-grow flex flex-col justify-center items-center px-6">
        {!concluido ? (
          <motion.div
            key={indice}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl text-center"
          >
            <p className="text-xl md:text-2xl mb-10">{perguntas[indice]}</p>

            <div className="flex flex-wrap justify-center gap-3">
              {opcoes.map((opcao, i) => (
                <button
                  key={i}
                  onClick={() => handleResposta(opcao.valor)}
                  className={`px-5 py-3 rounded-full border transition-all duration-300 ${
                    respostas[indice] === opcao.valor
                      ? "bg-amber-500 text-black border-amber-400"
                      : "border-neutral-700 hover:border-amber-400 hover:text-amber-400"
                  }`}
                >
                  {opcao.texto}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-10">
              {indice > 0 && (
                <button
                  onClick={handleVoltar}
                  className="px-6 py-3 bg-transparent border border-amber-400 text-amber-400 rounded-full hover:bg-amber-400 hover:text-black transition-all"
                >
                  Voltar
                </button>
              )}
              <button
                onClick={handleProximo}
                disabled={respostas[indice] === null}
                className={`px-6 py-3 rounded-full text-black transition-all ${
                  respostas[indice] === null
                    ? "bg-neutral-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-400 to-yellow-500 hover:opacity-90"
                }`}
              >
                {indice === perguntas.length - 1 ? "Concluir" : "Seguinte"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl mb-4">
              Estamos calculando o seu resultado...
            </h2>
            <p className="text-lg mb-8">
              Clique abaixo para acessar o resultado completo e receber os seus 2 e-books gratuitos.
            </p>
            <button
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full font-semibold hover:opacity-90 transition-all"
              onClick={() => handleSalvarResultado(pontuacaoTotal)}
            >
              Ver Resultado
            </button>

            <p className="mt-8 text-sm text-neutral-400">
              Sua pontuação total: {pontuacaoTotal} pontos
            </p>
          </motion.div>
        )}
      </div>

      {/* Faixa de destaque final */}
      <FaixaDestaque />
    </div>
  );
}
