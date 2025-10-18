"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "Você tem dificuldade em organizar tarefas que exigem muita concentração?",
  "Você evita ou adia tarefas que exigem muito pensamento?",
  "Você se distrai com facilidade por estímulos externos?",
  "Você deixa de prestar atenção em conversas, mesmo quando falam diretamente com você?",
  "Você perde ou esquece objetos importantes (chaves, celular, carteira)?",
  "Você se sente inquieto ou tem dificuldade em relaxar quando tem tempo livre?",
  "Você tem dificuldade em concluir os detalhes de um projeto após ter feito as partes mais difíceis?",
  "Você se sente impaciente em filas ou situações em que precisa esperar?",
  "Você interrompe os outros quando estão falando?",
  "Você fala demais em situações sociais?",
  "Você tem dificuldade em manter o foco em tarefas repetitivas ou demoradas?",
  "Você muda de atividade antes de concluir a anterior?",
  "Você sente que sua mente está acelerada, mesmo em momentos calmos?",
  "Você se sente sobrecarregado facilmente com múltiplas tarefas?",
  "Você precisa de lembretes constantes para compromissos ou prazos?",
  "Você toma decisões impulsivas sem pensar nas consequências?",
  "Você se sente distraído mesmo em ambientes silenciosos?",
  "Você sente que está sempre “ligado” ou não consegue parar de pensar?",
  "Você subestima o tempo necessário para realizar tarefas?",
  "Você se frustra com facilidade quando as coisas não saem como o esperado?",
  "Você sente que começa o dia produtivo, mas perde o ritmo rapidamente?",
  "Você perde o interesse em algo logo após começar?",
  "Você sente que precisa de pressão ou prazos para conseguir agir?",
  "Você sente dificuldade em priorizar tarefas importantes?",
  "Você se distrai durante leituras ou filmes?",
  "Você procrastina mesmo sabendo que isso te prejudica?",
  "Você sente que tem dificuldade em manter hábitos ou rotinas?",
  "Você se sente emocionalmente esgotado por pequenas coisas?",
  "Você sente dificuldade em ouvir instruções completas?",
  "Você se sente diferente das outras pessoas em como sua mente funciona?",
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
             {/* SEÇÃO 7 - FAIXA DESTAQUE FINAL */}
      <section className="py-6 px-6 text-center bg-black text-zinc-400 text-sm border-t border-zinc-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem em saúde mental (ASRS v1.1) e respeita as normas
          éticas e de privacidade. É uma ferramenta informativa e não substitui diagnóstico médico ou psicológico.
        </p>
      </section>
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
            Estamos calculando seu resultado…
          </p>
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
 {/* SEÇÃO 7 - FAIXA DESTAQUE FINAL */}
      <section className="py-6 px-6 text-center bg-black text-zinc-400 text-sm border-t border-zinc-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem em saúde mental (ASRS v1.1) e respeita as normas
          éticas e de privacidade. É uma ferramenta informativa e não substitui diagnóstico médico ou psicológico.
        </p>
      </section>
  );
}
