export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-800">
      {/* HERO */}
      <section className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4">
          Teste de TDAH Online – Descubra em minutos se você tem traços do transtorno
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Faça nosso teste rápido, obtenha sua pontuação e receba{" "}
          <span className="font-semibold text-purple-800">2 e-books gratuitos</span>{" "}
          sobre TDAH.
        </p>
        <a
          href="/teste"
          className="inline-block bg-orange-500 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-md hover:bg-orange-600 transition"
        >
          Iniciar Teste Gratuitamente
        </a>
      </section>

      {/* IDENTIFICAÇÃO */}
      <section className="bg-white py-14 px-6 shadow-inner">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Você se identifica?
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Já se perguntou por que:
          </p>
          <ul className="text-left text-lg space-y-3 mx-auto inline-block">
            <li>🧠 Você não consegue concluir tarefas importantes?</li>
            <li>💭 Sua mente se distrai com facilidade?</li>
            <li>🔥 Fica constantemente inquieto ou ansioso?</li>
            <li>📅 Tem dificuldade em organizar suas atividades diárias?</li>
          </ul>
          <p className="mt-8 text-gray-700">
            Esses podem ser sinais de <strong>TDAH em adultos</strong>. O Transtorno de
            Déficit de Atenção com Hiperatividade afeta foco, atenção e
            organização, podendo impactar sua vida pessoal e profissional.
          </p>
        </div>
      </section>

      {/* EXEMPLO RESULTADO */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-purple-50 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          Veja um exemplo do resultado
        </h2>
        <img
          src="/exemplo-resultado.png"
          alt="Exemplo de resultado do teste"
          className="mx-auto rounded-xl shadow-lg max-w-md mb-6"
        />
        <p className="max-w-2xl mx-auto text-gray-700 text-lg">
          Após concluir o teste, você verá uma pontuação de 0 a 150, indicando a
          possibilidade de traços de TDAH e recomendações para buscar avaliação
          profissional.
        </p>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-10">
          Por que fazer o teste?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-purple-50 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-xl text-purple-700 mb-2">
              Entenda seus comportamentos
            </h3>
            <p>Identifique padrões de distração, hiperatividade e desatenção.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-xl text-purple-700 mb-2">
              Orientação profissional
            </h3>
            <p>
              Receba recomendações sobre a necessidade de avaliação médica
              especializada.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-xl text-purple-700 mb-2">
              E-books gratuitos
            </h3>
            <p>
              Ganhe materiais digitais sobre foco, produtividade e TDAH em
              adultos.
            </p>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-10">
          O que dizem sobre o teste
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Mariana S.",
              text: "Sempre achei que eu era só distraída, mas o teste me ajudou a entender melhor meus comportamentos. Foi um divisor de águas!",
            },
            {
              name: "Carlos A.",
              text: "O resultado me orientou a buscar um especialista. Hoje estou em tratamento e minha produtividade melhorou muito.",
            },
            {
              name: "Fernanda L.",
              text: "Fiz o teste por curiosidade e fiquei impressionada com a clareza das perguntas e do resultado. Super recomendo!",
            },
          ].map((d, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md border">
              <p className="text-gray-700 italic mb-4">“{d.text}”</p>
              <p className="font-semibold text-purple-700">— {d.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-16 bg-purple-700 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para descobrir se você tem traços de TDAH?
        </h2>
        <p className="mb-8 text-lg">
          O teste é rápido, gratuito e validado com base em estudos clínicos.
        </p>
        <a
          href="/teste"
          className="inline-block bg-orange-500 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-orange-600 transition"
        >
          Fazer o teste agora
        </a>
      </section>
    </main>
  );
}
