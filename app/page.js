'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Seção Hero */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Teste de TDAH Online – Descubra em minutos se você tem traços do transtorno
        </h1>
        <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
          Faça nosso teste gratuito, rápido e profissionalmente estruturado. Descubra se
          seus desafios de foco, organização e impulsividade podem estar ligados ao TDAH.
        </p>
        <Link
          href="/teste"
          className="bg-yellow-400 text-gray-900 font-semibold px-8 py-4 rounded-full hover:bg-yellow-500 transition duration-300 shadow-md"
        >
          Fazer o Teste Agora
        </Link>
      </section>

      {/* Seção de Identificação */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Já se perguntou por que é tão difícil se concentrar?
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Você se distrai facilmente, começa tarefas mas raramente as conclui? 
          Esquece compromissos importantes ou tem dificuldade em organizar sua rotina?
        </p>
        <p className="text-lg leading-relaxed">
          Esses comportamentos podem indicar traços do <strong>TDAH (Transtorno de Déficit de Atenção e Hiperatividade)</strong> — 
          uma condição que afeta a concentração, a gestão do tempo e o controle da impulsividade. 
          Nosso teste foi desenvolvido seguindo normas de avaliação reconhecidas na área da saúde.
        </p>
      </section>

      {/* Seção da Imagem de Exemplo */}
      <section className="py-12 px-6 max-w-5xl mx-auto text-center">
        <div className="bg-gray-100 border rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Veja um exemplo de resultado:</h3>
          <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
            <p>(Imagem do exemplo de resultado será adicionada aqui)</p>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="py-20 px-6 bg-gradient-to-b from-indigo-50 to-white">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">
          O que dizem as pessoas que fizeram o teste
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            "O resultado me orientou a buscar um especialista. Hoje estou em tratamento e minha produtividade melhorou muito.",
            "Os e-books foram muito informativos. Recomendo o teste para qualquer adulto que sente dificuldade de concentração.",
            "Sempre achei que eu era só distraída, mas o teste me ajudou a entender melhor meus comportamentos. Foi um divisor de águas!",
            "Fiz o teste e finalmente entendi meus padrões de distração. Me ajudou a buscar ajuda profissional!"
          ].map((depoimento, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300"
            >
              <p className="italic text-gray-700">“{depoimento}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção Final de Chamada */}
      <section className="text-center py-20 px-6 bg-blue-600 text-white">
        <h3 className="text-3xl font-bold mb-4">Pronto para entender melhor sua mente?</h3>
        <p className="text-lg mb-8 opacity-90">
          Faça o teste gratuito e descubra se seus sintomas podem estar relacionados ao TDAH.
        </p>
        <Link
          href="/teste"
          className="bg-yellow-400 text-gray-900 font-semibold px-10 py-4 rounded-full hover:bg-yellow-500 transition duration-300 shadow-md"
        >
          Iniciar Teste Agora
        </Link>
      </section>
    </main>
  );
}
