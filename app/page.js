"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#FFA73333,_transparent_70%)]"></div>

        <motion.img
          src="/tdah-symbol.png" // coloque aqui o símbolo do TDAH
          alt="Símbolo TDAH"
          className="w-24 h-24 mb-8 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Descubra se seus desafios de foco e atenção<br />
          têm relação com o <span className="text-[#FFA733]">TDAH</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-zinc-300 mb-10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Um teste rápido e preciso para identificar traços de desatenção, impulsividade e hiperatividade em adultos.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#FFA733] font-semibold shadow-[0_0_20px_#FFA73355] transition"
        >
          Fazer o teste agora
        </motion.button>
      </section>

      {/* SEÇÃO 2 - VOCÊ JÁ SE PERGUNTOU... */}
      <section className="py-20 px-6 bg-black/80 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Você já se perguntou por que...
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "… tem dificuldade em manter o foco por muito tempo?",
            "… começa várias tarefas mas raramente as conclui?",
            "… se sente sobrecarregado facilmente ou esquece compromissos importantes?",
          ].map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
            >
              <p className="text-zinc-200">{text}</p>
            </motion.div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto mt-12 text-zinc-400">
          Esses podem ser sinais de <span className="text-[#FFA733]">Traços de TDAH</span> (Transtorno de Déficit de Atenção e Hiperatividade) — um padrão de funcionamento cerebral que afeta milhões de adultos em todo o mundo.
        </p>
      </section>

      {/* SEÇÃO 3 - O QUE É O TDAH */}
      <section className="py-20 px-6 bg-[#FFA733] text-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">O que é o TDAH?</h2>
        <p className="max-w-4xl mx-auto text-lg font-medium leading-relaxed">
          O TDAH é um transtorno neurobiológico caracterizado por sintomas de desatenção, impulsividade e hiperatividade.
          Ele pode afetar o desempenho no trabalho, nos estudos e nas relações pessoais — mas é totalmente possível
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
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-3 text-[#FFA733]">{item.title}</h3>
              <p className="text-zinc-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 5 - DEPOIMENTOS */}
      <section className="py-20 px-6 bg-zinc-900/70 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          O que dizem as pessoas que já fizeram o teste
        </h2>
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
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
            >
              <p className="text-zinc-300 italic mb-4">"{d.text}"</p>
              <p className="text-[#FFA733] font-semibold">{d.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 6 - CTA FINAL */}
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#FFA73322,_transparent_70%)]"></div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8 z-10 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Pronto para descobrir se você tem traços de TDAH?
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 rounded-2xl bg-[#FFA733] text-black font-bold shadow-[0_0_25px_#FFA73388] transition z-10 relative"
        >
          Iniciar meu teste agora
        </motion.button>
      </section>

      {/* SEÇÃO 7 - FAIXA DESTAQUE FINAL */}
      <section className="py-6 px-6 text-center bg-black text-zinc-400 text-sm border-t border-zinc-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem em saúde mental e respeita as normas
          éticas e de privacidade. É uma ferramenta informativa e não substitui diagnóstico médico ou psicológico.
        </p>
      </section>
    </main>
  );
}
