"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* Título */}
      <header className="py-12 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-orange-400 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🧠 Acesse seu resultado completo e receba seus 2 e-books agora mesmo
        </motion.h1>
      </header>

      {/* Conteúdo */}
      <main className="flex flex-col items-center justify-center text-center px-6 md:px-0 flex-1">
        <motion.div
          className="max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-orange-300">
            Por apenas R$4,99, você vai:
          </h2>

          <ul className="space-y-3 text-lg text-gray-200">
            <li>✔️ Descobrir seu nível de atenção e foco (pontuação de 0 a 150)</li>
            <li>✔️ Receber explicação detalhada do que o resultado significa</li>
            <li>✔️ Ganhar 2 e-books exclusivos sobre TDAH</li>
          </ul>

          {/* Selo de segurança */}
          <div className="mt-8 flex items-center justify-center space-x-2 text-gray-300 text-sm">
            <div className="w-5 h-5">
              {/* Ícone de cadeado SVG inline */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m10.5 0a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5m10.5 0h-10.5"
                />
              </svg>
            </div>
            <p>Pagamento 100% seguro via Mercado Pago</p>
          </div>

          {/* Botão de pagamento */}
          <motion.div
            className="mt-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="https://mpago.la/1mPF3si"
              target="_blank"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/40 backdrop-blur-md bg-opacity-90"
            >
              ACESSAR MEU RESULTADO AGORA
            </Link>
            <p className="text-sm text-gray-400 mt-3">
              (pagamento único, acesso imediato após confirmação)
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Faixa de destaque final */}
      <footer className="bg-black/80 text-gray-300 text-sm text-center py-6 mt-16 border-t border-gray-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem
          em saúde mental e respeita as normas éticas e de privacidade. É uma
          ferramenta informativa e não substitui diagnóstico médico ou
          psicológico.
        </p>
      </footer>
    </div>
  );
}
