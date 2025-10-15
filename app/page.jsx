// app/page.jsx
'use client';

import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-5 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubra se você pode ter TDAH</h1>
        <p className="text-lg md:text-xl mb-8">
          Faça nosso teste rápido, obtenha sua pontuação e receba <strong>2 e-books gratuitos</strong> sobre TDAH!
        </p>
        <a href="/teste" className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          Iniciar Teste
        </a>
      </section>

      {/* Identificação Section */}
      <section className="py-16 px-5 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Você se identifica?</h2>
        <p className="text-gray-700 text-lg mb-4">
          Já se perguntou por que:
        </p>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2 mb-6">
          <li>Você não consegue concluir tarefas importantes?</li>
          <li>Sua mente se distrai com facilidade?</li>
          <li>Fica constantemente inquieto ou ansioso?</li>
          <li>Tem dificuldade em organizar suas atividades diárias?</li>
        </ul>
        <p className="text-gray-700 text-lg">
          Esses podem ser sinais de <strong>TDAH em adultos</strong>. O Transtorno de Déficit de Atenção com Hiperatividade afeta foco, atenção e organização, podendo impactar sua vida pessoal e profissional. Este teste pode ajudar você a entender se esses traços estão presentes e indicar a necessidade de procurar um especialista.
        </p>
      </section>

      {/* Exemplo do Resultado */}
      <section className="py-16 px-5 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Veja um exemplo do resultado</h2>
        <div className="max-w-md mx-auto shadow-lg rounded-xl overflow-hidden mb-6">
          <Image
            src="/exemplo-resultado.png"
            alt="Exemplo de resultado do teste"
            width={500}
            height={300}
            className="w-full h-auto"
          />
        </div>
        <p className="text-gray-700 text-lg max-w-xl mx-auto">
          Após concluir o teste, você verá uma pontuação de 0 a 150, indicando a possibilidade de traços de TDAH e recomendação para buscar avaliação profissional.
        </p>
      </section>

      {/* Benefícios */}
      <section className="py-16 px-5 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-bold mb-3">Entenda seus comportamentos</h3>
          <p className="text-gray-700">Identifique padrões de distração, hiperatividade e desatenção.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-bold mb-3">Orientação profissional</h3>
          <p className="text-gray-700">Receba recomendações sobre a necessidade de avaliação médica especializada.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-bold mb-3">E-books gratuitos</h3>
          <p className="text-gray-700">Ao concluir o teste, você recebe os e-books “Explicando o TDAH” e “Como o TDAH afeta Relacionamentos”.</p>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 px-5 bg-gray-100 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">O que dizem sobre o teste</h2>
        <div className="space-y-6">
          <blockquote className="bg-white p-6 rounded-xl shadow-md">
            <p>“Fiz o teste e finalmente entendi meus padrões de distração. Me ajudou a buscar ajuda profissional!”</p>
            <footer className="mt-2 text-gray-500">– Juliana, 28 anos</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-xl shadow-md">
            <p>“Os e-books foram muito informativos. Recomendo o teste para qualquer adulto que sente dificuldade de concentração.”</p>
            <footer className="mt-2 text-gray-500">– Carlos, 35 anos</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-xl shadow-md">
            <p>“O teste é rápido, confiável e fácil de fazer. Curioso ver a pontuação e o que ela significa!”</p>
            <footer className="mt-2 text-gray-500">– Marina, 30 anos</footer>
          </blockquote>
        </div>
      </section>

      {/* Credibilidade / Garantia */}
      <section className="py-12 px-5 text-center max-w-3xl mx-auto">
        <p className="text-gray-700 text-lg">
          🔒 Este teste é apenas informativo, criado seguindo normas de saúde reconhecidas e **não substitui avaliação médica profissional**. Seus dados são totalmente protegidos.
        </p>
      </section>

      {/* CTA Final */}
      <section className="py-12 px-5 text-center">
        <a href="/teste" className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-xl">
          Começar Teste e Receber E-books
        </a>
      </section>
    </main>
  );
}
