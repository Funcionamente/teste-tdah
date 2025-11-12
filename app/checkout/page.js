"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CheckoutPage() {
const handlePayment = async () => {
  setLoading(true);
  // abre popup imediatamente para evitar bloqueadores
  const popup = window.open("", "_blank", "noopener,noreferrer");
  if (!popup) {
    alert("Por favor permita pop-ups para este site.");
    setLoading(false);
    return;
  }

  try {
    // gera uma referência única — use a ref que você usa no backend
    const referenceId = "ref_" + Date.now();

    // Cria preferência (backend) — mantenha o mesmo body que já usa
    const response = await fetch("/api/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referenceId,
        title: "Resultado completo + 2 eBooks exclusivos",
        price: 4.99,
      }),
    });

    const data = await response.json();
    if (!data?.init_point) {
      popup.close();
      alert("Erro ao criar o link de pagamento. Tente novamente.");
      console.error("Erro:", data);
      setLoading(false);
      return;
    }

    // navega o popup para o checkout do Mercado Pago
    popup.location.href = data.init_point;

    // começar polling para checar status do pagamento
    let attempts = 0;
    const maxAttempts = 60; // 60 * 2s = 2 minutos de polling (ajuste se quiser)
    const interval = 2000; // 2s

    const poller = setInterval(async () => {
      attempts++;
      try {
        const statusRes = await fetch(`/api/payment-status?ref=${encodeURIComponent(referenceId)}`);
        const statusJson = await statusRes.json();
        // se erro, continue tentando até maxAttempts
        if (statusJson?.status === "approved") {
          clearInterval(poller);
          try { popup.close(); } catch (e) { /* ignore */ }
          // redireciona o usuário (página principal) para o fluxo intermediário ou direto ao final
          window.location.href = `/resultado?external_reference=${encodeURIComponent(referenceId)}&status=success`;
          return;
        }
        if (attempts >= maxAttempts) {
          clearInterval(poller);
          // manter popup aberto; avisar usuário
          alert("Pagamento não aprovado em tempo. Verifique sua forma de pagamento ou tente novamente.");
        }
      } catch (err) {
        console.error("poll error:", err);
        // não interrompe — tentará de novo
        if (attempts >= maxAttempts) {
          clearInterval(poller);
          alert("Erro ao verificar pagamento. Tente novamente.");
        }
      }
    }, interval);
  } catch (err) {
    console.error("Erro ao iniciar o pagamento:", err);
    try { popup.close(); } catch (e) {}
    alert("Erro ao iniciar o pagamento.");
  } finally {
    setLoading(false);
  }
};

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
          🧠 Acesse o seu resultado completo e receba os seus 2 e-books agora mesmo
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
            <li>✔️ Descobrir o seu nível de atenção e foco</li>
            <li>✔️ Receber explicação detalhada do que o resultado significa</li>
            <li>✔️ Ganhar 2 e-books exclusivos sobre TDAH</li>
          </ul>

          {/* Selo de segurança */}
          <div className="mt-8 flex items-center justify-center space-x-2 text-gray-300 text-sm">
            <div className="w-5 h-5">
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

          {/* Botão de pagamento dinâmico */}
          <motion.div
            className="mt-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`inline-block ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              } text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/40 backdrop-blur-md bg-opacity-90`}
            >
              {loading ? "Gerando link de pagamento..." : "ACESSAR MEU RESULTADO AGORA"}
            </button>
            <p className="text-sm text-gray-400 mt-3">
              (Pagamento único. Após a confirmação, você será redirecionado automaticamente para ver o seu resultado.)
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Faixa de destaque final */}
      <footer className="bg-black/80 text-gray-300 text-sm text-center py-6 mt-16 border-t border-gray-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem
          em saúde mental (ASRS v1.1) e respeita as normas éticas e de privacidade. É uma
          ferramenta informativa e não substitui diagnóstico médico ou
          psicológico.
        </p>
      </footer>
    </div>
  );
}
