export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Cabeçalho */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Descubra seu nível de atenção e foco
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Já se perguntou por que não consegue concluir tarefas, se concentrar ou manter o foco?
          Isso pode ser um traço de TDAH. Nosso teste profissional, baseado em normas de saúde,
          ajuda você a entender seu perfil de atenção.
        </p>
        <button className="px-8 py-4 text-white font-semibold bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/30">
          Iniciar Teste
        </button>
      </section>

      {/* Depoimentos */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-600">Depoimentos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <p>"O teste me ajudou a identificar padrões e buscar ajuda profissional. Super recomendo!"</p>
            <span className="block mt-4 font-semibold">— Ana S.</span>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <p>"Simples, rápido e muito esclarecedor. Me senti seguro com a metodologia." </p>
            <span className="block mt-4 font-semibold">— Carlos M.</span>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <p>"A experiência foi excelente e me motivou a procurar um especialista."</p>
            <span className="block mt-4 font-semibold">— Beatriz F.</span>
          </div>
        </div>
      </section>

      {/* Exemplo de Resultado */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Exemplo do Resultado</h2>
        <img
          src="/exemplo-resultado.png"
          alt="Exemplo de Resultado do Teste"
          className="mx-auto rounded-xl shadow-lg"
        />
      </section>

      {/* E-books */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Bônus Exclusivos</h2>
        <p className="text-gray-700 mb-4">
          Ao concluir o teste, você receberá gratuitamente dois e-books sobre TDAH:
        </p>
        <ul className="list-disc list-inside text-gray-700 font-medium">
          <li>Explicando o TDAH</li>
          <li>Como o TDAH afeta Relacionamentos</li>
        </ul>
      </section>
    </main>
  );
}
