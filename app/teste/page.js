"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "Com que frequência você tem dificuldade em concluir os detalhes de um projeto após ter feito as partes mais difíceis?",
  "Com que frequência você tem dificuldade em organizar tarefas que exigem muita concentração?",
  "Com que frequência você evita ou adia tarefas que exigem muito pensamento?",
  "Com que frequência você se distrai com facilidade por estímulos externos?",
  "Com que frequência você deixa de prestar atenção em conversas, mesmo quando falam diretamente com você?",
  "Com que frequência você perde ou esquece objetos importantes (chaves, celular, carteira)?",
  "Com que frequência você se sente inquieto ou tem dificuldade em relaxar quando tem tempo livre?",
  "Com que frequência você se sente impaciente em filas ou situações em que precisa esperar?",
  "Com que frequência você interrompe os outros quando estão falando?",
  "Com que frequência você fala demais em situações sociais?",
  "Com que frequência você tem dificuldade em manter o foco em tarefas repetitivas ou demoradas?",
  "Com que frequência você muda de atividade antes de concluir a anterior?",
  "Com que frequência você sente que sua mente está acelerada, mesmo em momentos calmos?",
  "Com que frequência você se sente sobrecarregado facilmente com múltiplas tarefas?",
  "Com que frequência você precisa de lembretes constantes para compromissos ou prazos?",
  "Com que frequência você toma decisões impulsivas sem pensar nas consequências?",
  "Com que frequência você se sente distraído mesmo em ambientes silenciosos?",
  "Com que frequência você sente que está sempre “ligado” ou não consegue parar de pensar?",
  "Com que frequência você subestima o tempo necessário para realizar tarefas?",
  "Com que frequência você se frustra com facilidade quando as coisas não saem como o esperado?",
  "Com que frequência você sente que começa o dia produtivo, mas perde o ritmo rapidamente?",
  "Com que frequência você perde o interesse em algo logo após começar?",
  "Com que frequência você sente que precisa de pressão ou prazos para conseguir agir?",
  "Com que frequência você sente dificuldade em priorizar tarefas importantes?",
  "Com que frequência você se distrai durante leituras ou filmes?",
  "Com que frequência você procrastina mesmo sabendo que isso te prejudica?",
  "Com que frequência você sente que tem dificuldade em manter hábitos ou rotinas?",
  "Com que frequência você se sente emocionalmente esgotado por pequenas coisas?",
  "Com que frequência você sente dificuldade em ouvir instruções completas?",
  "Com que frequência você se sente diferente das outras pessoas em como sua mente funciona?",
];

const options = [
  { label: "Nunca", value: 0 },
  { label: "Raramente", value: 1 },
  { label: "Às vezes", value: 2 },
  { label: "Frequentemente", value: 3 },
  { label: "Sempre", value: 5 },
];

export default function TestePage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const progress = ((current + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
    else handleFinish();
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleFinish = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setFinished(true);
    }, 2000);
  };

  const totalScore = answers.reduce((acc, val) => acc + (val ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white px-4">
      <h1 className="text-3xl font-bold text-[#f59e0b] mb-8 text-center">
        Teste Interativo TDAH
      </h1>

      {!finished ? (
        <>
          {/* Barra de progresso */}
          <div className="w-full max-w-xl bg-gray-700 rounded-full h-2 mb-10 overflow-hidden">
            <motion.div
              className="bg-[#f59e0b] h-2"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl text-center"
            >
              <p className="text-lg sm:text-xl font-medium mb-8">
                {questions[current]}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`px-4 py-2 rounded-full text-sm sm:text-base border transition-all ${
                      answers[current] === option.value
                        ? "bg-[#f59e0b] text-black border-[#f59e0b]"
                        : "border-gray-500 hover:border-[#f59e0b]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botões de navegação */}
          <div className="flex gap-4 mt-12">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-40 transition"
            >
              Voltar
            </button>

            {current < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={answers[current] === null}
                className="px-6 py-3 rounded-full bg-[#f59e0b] text-black font-semibold hover:brightness-110 disabled:opacity-40 transition"
              >
                Seguinte
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={answers[current] === null}
                className="px-6 py-3 rounded-full bg-[#f59e0b] text-black font-semibold hover:brightness-110 disabled:opacity-40 transition"
              >
                Concluir
              </button>
            )}
          </div>
        </>
      ) : showLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-xl mb-6">Estamos calculando o seu resultado…</p>
          <div className="w-10 h-10 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      ) : (
        <motion.div
          key="result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-xl mb-4">
            Clique abaixo para acessar o resultado completo e receber os seus 2 e-books gratuitos.
          </p>
          <a
            href="/checkout"
            className="inline-block mt-6 px-8 py-4 bg-[#f59e0b] text-black font-bold rounded-full hover:brightness-110 transition"
          >
            Ver Resultado
          </a>
        </motion.div>
      )}
    </div>
  );
}
