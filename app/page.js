"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#FFA73333,_transparent_70%)] pointer-events-none"></div>

        {/* Símbolo do TDAH - coloque public/tdah-symbol.png */}
        <img
          src="/tdah-symbol.png"
          alt="Símbolo TDAH"
          className="w-32 h-32 mb-16 z-18 animate-fadeIn"
          style={{ animationDelay: "0.1s" }}
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-6 z-10 leading-tight">
          Descubra se seus desafios de foco e atenção
          <br />
          têm relação com o <span className="text-[#FFA733]">TDAH</span>
        </h1>

        <p className="max-w-2xl text-zinc-300 mb-10 z-10">
          Um teste rápido e preciso para identificar traços de desatenção, impulsividade e hiperatividade em adultos.
        </p>

        <a
          href="/teste"
          className="inline-block px-10 py-5 rounded-2xl bg-[#FFA733] text-black font-bold shadow-[0_0_25px_#FFA73388] transition-transform transform hover:-translate-y-1"
        >
          Iniciar meu teste agora
        </a>
      </section>

      {/* SEÇÃO 2 - VOCÊ JÁ SE PERGUNTOU... */}
      <section className="py-20 px-6 bg-black/80 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Você já se perguntou por que...</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "… tem dificuldade em manter o foco por muito tempo?",
            "… começa várias tarefas mas raramente as conclui?",
            "… se sente sobrecarregado facilmente ou esquece compromissos importantes?",
          ].map((text, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <p className="text-zinc-200">{text}</p>
            </div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto mt-12 text-zinc-400">
          Esses podem ser sinais de <span className="text-[#FFA733]">Traços de TDAH</span> (Transtorno de Déficit de Atenção e Hiperatividade), um padrão de funcionamento cerebral que afeta milhões de adultos em todo o mundo.
        </p>
      </section>

      {/* SEÇÃO 3 - O QUE É O TDAH */}
      <section className="py-20 px-6 bg-[#FFA733] text-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">O que é o TDAH?</h2>
        <p className="max-w-4xl mx-auto text-lg font-medium leading-relaxed">
          O TDAH é um transtorno neurobiológico caracterizado por sintomas de desatenção, impulsividade e hiperatividade.
          Ele pode afetar o desempenho no trabalho, nos estudos e nas relações pessoais, mas é totalmente possível
          aprender a gerenciar e equilibrar esses traços com orientação adequada.
        </p>
      </section>

      {/* SEÇÃO 4 - POR QUE FAZER O TESTE */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Por que fazer o teste?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              title: "Autoconhecimento",
              text: "Entenda melhor seus padrões de comportamento e foco.",
            },
            {
              title: "Clareza emocional",
              text: "Descubra como o TDAH pode estar influenciando sua produtividade e relacionamentos.",
            },
            {
              title: "Próximos passos",
              text: "Saiba se é o momento de buscar avaliação profissional.",
            },
            {
              title: "Ganhe 2 e-books grátis",
              text: "Receba gratuitamente os e-books Explicando o TDAH e Como o TDAH afeta relacionamentos.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-3 text-[#FFA733]">{item.title}</h3>
              <p className="text-zinc-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 5 - DEPOIMENTOS */}
      <section className="py-20 px-6 bg-zinc-900/70 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">O que dizem as pessoas que já fizeram o teste</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Ana P.",
              text: "O teste abriu meus olhos! Finalmente entendi porque eu sempre me sentia sobrecarregada e sem foco.",
            },
            {
              name: "Lucas M.",
              text: "Achei super preciso e rápido. Me ajudou a buscar o acompanhamento certo. Recomendo!",
            },
            {
              name: "Renata G.",
              text: "Foi libertador entender que meu jeito de funcionar tem explicação e pode ser equilibrado.",
            },
          ].map((d, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <p className="text-zinc-300 italic mb-4">"{d.text}"</p>
              <p className="text-[#FFA733] font-semibold">{d.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 6 - CTA FINAL */}
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#FFA73322,_transparent_70%)] pointer-events-none"></div>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 z-10 relative">Pronto para descobrir se você tem traços de TDAH?</h2>
        <a
          href="/teste"
          className="inline-block px-10 py-5 rounded-2xl bg-[#FFA733] text-black font-bold shadow-[0_0_25px_#FFA73388] transition-transform transform hover:-translate-y-1"
        >
          Iniciar meu teste agora
        </a>
      </section>

      {/* SEÇÃO 7 - FAIXA DESTAQUE FINAL */}
      <section className="py-6 px-6 text-center bg-black text-zinc-400 text-sm border-t border-zinc-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem em saúde mental e respeita as normas
          éticas e de privacidade. É uma ferramenta informativa e não substitui diagnóstico médico ou psicológico.
        </p>
      </section>

      {/* Pequenas animações via CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.9s ease both;
        }
      `}</style>
    </main>
  );
}
