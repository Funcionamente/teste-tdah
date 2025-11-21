"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";


export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [retryTimeout, setRetryTimeout] = useState(null);
  const popupRef = useRef(null);

  const handlePayment = async () => {
    setLoading(true);
    setAwaitingPayment(false);

    try {
      const referenceId = "ref_" + Date.now();

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

      if (data?.init_point) {
        const paymentWindow = window.open(
          data.init_point,
          "_blank",
          "width=600,height=800,noopener,noreferrer"
        );
        popupRef.current = paymentWindow;

        setAwaitingPayment(true);
        setLoading(false);

        const pollPayment = async () => {
          try {
            const res = await fetch(`/api/payment-status?ref=${referenceId}`);
            const result = await res.json();
            console.log("  Status atual do pagamento:", result.status);

            if (result.status === "approved") {
              console.log("  Pagamento aprovado detectado! Redirecionando...");

              // Marca no localStorage
              localStorage.setItem("paymentSuccess", "true");

              // Fecha popup com segurança
              try {
                if (paymentWindow && !paymentWindow.closed) {
                  paymentWindow.close();
                } else {
                  // fallback — alguns browsers bloqueiam close()
                  window.open("", "_self")?.close();
                }
              } catch (e) {
                console.warn("  Falha ao fechar popup:", e);
              }

              // Redirecionamento seguro
              setTimeout(() => {
                try {
                  window.location.href = `/resultado?ref=${referenceId}`;
                } catch (e) {
                  console.error("  Falha ao redirecionar via router, fallback:", e);
                  window.location.assign(`/resultado?ref=${referenceId}`);
                }
              }, 500);

              return true;
            }
            return false;
          } catch (err) {
            console.error("Erro ao verificar status:", err);
            return false;
          }
        };

        // Polling principal
        const interval = setInterval(async () => {
          const done = await pollPayment();
          if (done) clearInterval(interval);
        }, 5000);

        // Fallback quando popup for fechado manualmente
        const popupCheck = setInterval(async () => {
          if (paymentWindow.closed) {
            clearInterval(popupCheck);
            const done = await pollPayment();
            if (!done) {
              clearInterval(interval);
              setAwaitingPayment(false);
              alert("O pagamento ainda não foi confirmado. Tente novamente em alguns segundos.");
            }
          }
        }, 1000);
      } else {
        alert("Erro ao criar o link de pagamento. Tente novamente.");
        console.error("Erro:", data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Erro ao iniciar o pagamento:", err);
      alert("Erro ao iniciar o pagamento.");
      setLoading(false);
    }
  };

  // Limpa flags se o usuário recarregar
  useEffect(() => {
    localStorage.removeItem("paymentSuccess");
    if (retryTimeout) clearTimeout(retryTimeout);
  }, []);

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
           Acesse o seu resultado completo e receba os seus 2 e-books agora mesmo
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
          {!awaitingPayment ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-orange-300">
                Por apenas R$4,99, você vai:
              </h2>

              <ul className="space-y-3 text-lg text-gray-200">
                <li>  Descobrir o seu nível de atenção e foco</li>
                <li>  Receber explicação detalhada do que o resultado significa</li>
                <li>  Ganhar 2 e-books exclusivos sobre TDAH</li>
              </ul>

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
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/40 backdrop-blur-md bg-opacity-90`}
                >
                  {loading
                    ? "Gerando link de pagamento..."
                    : "ACESSAR MEU RESULTADO AGORA"}
                </button>
                <p className="text-sm text-gray-400 mt-3">
                  (Pagamento único. Após a confirmação, você será redirecionado automaticamente.)
                </p>
              </motion.div>
            </>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 border-4 border-t-orange-400 border-gray-700 rounded-full animate-spin mb-6"></div>
              <p className="text-lg text-gray-200">
                Aguardando confirmação do pagamento...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Assim que o pagamento for aprovado, você será redirecionado automaticamente.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="bg-black/80 text-gray-300 text-sm text-center py-6 mt-16 border-t border-gray-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem
          em saúde mental (ASRS v1.1). É uma ferramenta informativa e não substitui diagnóstico médico.
        </p>
      </footer>
    </div>
  );
}
