"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f9fafb] via-[#eef2ff] to-[#e0e7ff] text-gray-800 p-6">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mb-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Teste TDAH Profissional
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
          Descubra em poucos minutos se você apresenta <strong>traços de TDAH</strong>.
          Nosso teste segue padrões de avaliação baseados em critérios científicos e psicológicos atualizados.
        </p>
      </section>

      {/* Identificação / Perguntas que conectam emocionalmente */}
      <section className="glass-card p-10 max-w-2xl text-center">
        <h2 className="text-2xl font-semibold mb-4 title-gradient">Você já se perguntou...</h2>
        <ul className="text-gray-700 text-lg mb-6 list-disc list-inside text-left space-y-2">
          <li>Por que é tão difícil se concentrar em tarefas simples?</li>
          <li>Por que começa várias coisas, mas termina poucas?</li>
          <li>Por que sente que sua mente nunca para?</li>
        </ul>
        <p className="text-gray-600">
          Esses sinais podem estar ligados a traços do <strong>TDAH (Transtorno de Déficit de Atenção e Hiperatividade)</strong>.
          O teste abaixo ajuda você a compreender melhor seu perfil de atenção e foco.
        </p>
      </section>

      {/* Exemplo do resultado do teste */}
      <section className="glass-card mt-16 p-10 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-6 title-gradient">Exemplo de Resultado</h2>
        <img
          src="https://via.placeholder.com/600x300/edf2ff/1e3a8a?text=Exemplo+de+Resultado+do+Teste+TDAH"
          alt="Exemplo de resultado"
          className="rounded-xl shadow-lg mb-6 mx-auto"
        />
        <p className="text-gray-600">
          O relatório mostra seu nível de atenção, impulsividade e hiperatividade — com uma breve
          análise de cada área e recomendações práticas para o seu dia a dia.
        </p>
      </section>

      {/* Depoimentos */}
      <section className="mt-20 max-w-4xl w-full px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 title-gradient">
          O que dizem sobre o teste
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              nome: "Mariana S.",
              texto:
                "O teste me ajudou a entender padrões que sempre ignorei. Foi um divisor de águas!",
            },
            {
              nome: "Lucas A.",
              texto:
                "Simples, rápido e com explicações claras. Finalmente entendi o que estava acontecendo comigo.",
            },
            {
              nome: "Fernanda T.",
              texto:
                "Achei o teste muito bem feito, com base científica e linguagem acessível.",
            },
          ].map((dep, i) => (
            <div key={i} className="glass-card p-6">
              <p className="italic text-gray-700 mb-4">“{dep.texto}”</p>
              <p className="font-semibold text-blue-700">{dep.nome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chamada final */}
      <section className="mt-20 text-center">
        <h3 className="text-2xl font-semibold mb-6 title-gradient">
          Pronto para entender melhor sua mente?
        </h3>
        <Link href="/teste">
          <button className="btn-glass px-10 py-3 text-lg">
            Fazer o Teste Agora
          </button>
        </Link>
      </section>

      {/* Rodapé */}
      <footer className="mt-24 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Avaliação Psicológica Digital. Todos os direitos reservados.</p>
        <p className="mt-2">Desenvolvido seguindo boas práticas e normas de avaliação psicológica reconhecidas.</p>
      </footer>
    </main>
  );
}
