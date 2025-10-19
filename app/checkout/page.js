"use client";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";
import FaixaDestaque from "@/components/FaixaDestaque";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-950 text-white">
      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-orange-400 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🧠 Acesse seu resultado completo e receba os seus 2 e-books agora mesmo
        </motion.h1>

        <motion.p
          className="text-neutral-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Por apenas <span className="text-orange-400 font-semibold">R$4,99</span>, você vai:
          <br /> <br />
          • Descobrir o seu nível de atenção e foco (pontuação de 0 a 150) <br />
          • Receber explicação detalhada do que o resultado significa <br />
          • Ganhar 2 e-books exclusivos sobre TDAH
        </motion.p>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4 text-neutral-400">
            <Lock className="w-5 h-5 text-green-400" />
            <span>Pagamento 100% seguro via Mercado Pago</span>
          </div>

          <Link
            href="https://LINK-DO-SEU-MERCADO-PAGO" // 🔗 Substitua aqui pelo seu link real de pagamento
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-400 hover:bg-orange-500 text-white text-lg md:text-xl font-semibold px-10 py-4 rounded-2xl transition-all shadow-lg hover:shadow-orange-400/40"
          >
            ACESSAR MEU RESULTADO AGORA
          </Link>

          <p className="text-neutral-500 text-sm mt-3">
            Pagamento único — acesso imediato após confirmação
          </p>
        </motion.div>
      </main>

      {/* Faixa de destaque final */}
      <FaixaDestaque />
    </div>
  );
}
