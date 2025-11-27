"use client";
import { motion } from "fra​mer-motion";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [retryTimeout, setRetryTimeout] = useState(null);

  // 🆕 Captura o ref vindo da URL (gerado no teste/page.js)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refFromURL = params.get("ref");
    if (refFromURL) {
      console.log("🔗 Referência recebida:", refFromURL);
      setReferenceId(refFromURL);
    }
  }, []);

  // 🔧 Função principal de pagamento
  const handlePayment = async () => {
    setLoading(true);
    setAwaitingPayment(false);
    setPaymentApproved(false);

    try {
      // 🔹 Usa o ref já existente (não gera um novo)
      const ref = referenceId || "ref_" + Date.now();
      setReferenceId(ref);

      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceId: ref,
          title: "Resultado completo + 2 eBooks exclusivos",
          price: 4.99,
        }),
      });

      const data = await response.json();

      if (data?.init_point) {
        // ✅ Abre o checkout em uma nova aba
        const paymentWindow = window.open(
          data.init_point,
          "_blank",
          "width=600,height=800,noopener,noreferrer"
        );

        // Exibe tela de "aguardando confirmação"
        setAwaitingPayment(true);
        setLoading(false);

        // ⏱️ Verifica o status do pagamento a cada 5 segundos
        const interval = setInterval(async () => {
          try {
            const res = await fetch(`/api/payment-status?ref=${ref}`);
            const result = await res.json();
            console.log("🔎 Status atual do pagamento:", result.status);

            if (result.status === "approved") {
              clearInterval(interval);
              localStorage.setItem("paymentSuccess", "true");
              setPaymentApproved(true);
              if (paymentWindow && !paymentWindow.closed) paymentWindow.close();
              console.log("✅ Pagamento aprovado!");
              
              // Redirecionamento automático
              setTimeout(() => {
                window.location.href = `/resultado?ref=${ref}`;
              }, 2000);
            }
          } catch (err) {
            console.error("Erro ao verificar status:", err);
          }
        }, 5000);

        // 🧩 Detecta se o popup foi fechado antes de pagar
        const popupCheck = setInterval(async () => {
          if (paymentWindow.closed) {
            clearInterval(popupCheck);
            console.log("💡 Popup fechado. Verificando status...");

            try {
              const res = await fetch(`/api/payment-status?ref=${ref}`);
              const result = await res.json();
              if (result.status === "approved") {
                clearInterval(interval);
                localStorage.setItem("paymentSuccess", "true");
                setPaymentApproved(true);
                console.log("✅ Pagamento aprovado mesmo com popup fechado!");
              }
            } catch (err) {
              console.error("Erro ao verificar status no fechamento:", err);
            }
          }
        }, 2000);
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

  // 🔁 Verifica status se o usuário recarregar a página enquanto aguardava
  useEffect(() => {
    if (!awaitingPayment || !referenceId) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment-status?ref=${referenceId}`);
        const result = await res.json();
        if (result.status === "approved") {
          clearInterval(interval);
          setPaymentApproved(true);
          localStorage.setItem("paymentSuccess", "true");
          console.log("✅ Pagamento aprovado após reload!");
        }
      } catch (err) {
        console.error("Erro ao verificar status no reload:", err);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [awaitingPayment, referenceId]);

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
          {!awaitingPayment ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-orange-300">
                Por apenas R$4,99, você vai:
              </h2>

              <ul className="space-y-3 text-lg text-gray-200">
                <li>✔️ Descobrir o seu nível de atenção e foco</li>
                <li>✔️ Receber explicação detalhada do que o resultado significa</li>
                <li>✔️ Ganhar 2 e-books exclusivos sobre TDAH</li>
              </ul>

              <div className="mt-8 flex items-center justify-center space-x-2 text-gray-300 text-sm">
                <div className="w-5 h-5">
                  <svg xmlns="http://.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m10.5 0a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5m10.5 0h-10.5" />
                  </svg>
                </div>
                <p>Pagamento 100% seguro via Mercado Pago</p>
              </div>

              <motion.div className="mt-10" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
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
            </>
          ) : (
            // Tela "aguardando pagamento"
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {!paymentApproved ? (
                <>
                  <div className="w-12 h-12 border-4 border-t-orange-400 border-gray-700 rounded-full animate-spin mb-6"></div>
                  <p className="text-lg text-gray-200">Aguardando confirmação do pagamento...</p>
                  <p className="text-sm text-gray-500 mt-2">Assim que for aprovado, você será redirecionado automaticamente.</p>
                </>
              ) : (
                <>
                  <p className="text-lg text-green-400 mb-4 font-semibold">✅ Pagamento confirmado!</p>
                  <p className="text-gray-300 mb-6">Clique abaixo se não foi redirecionado automaticamente.</p>
                  <button
                    onClick={() => window.location.href = `/resultado?ref=${referenceId}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/40"
                  >
                    VER MEU RESULTADO AGORA
                  </button>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Rodapé */}
      <footer className="bg-black/80 text-gray-300 text-sm text-center py-6 mt-16 border-t border-gray-800">
        <p>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem
          em saúde mental (ASRS v1.1). É uma ferramenta informativa e não substitui diagnóstico médico.
        </p>
      </footer>
    </div>
  );
}
