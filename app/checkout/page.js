"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [retryTimeout, setRetryTimeout] = useState(null);

  // 🔧 Função principal de pagamento (CORRIGIDA PARA IPHONE)
  const handlePayment = async () => {
    setLoading(true);
    setAwaitingPayment(false);
    setPaymentApproved(false);

    try {
      const ref = "ref_" + Date.now();
      setReferenceId(ref);

      // ✅ SOLUÇÃO: abre a aba ANTES do fetch (iPhone não bloqueia)
      const paymentWindow = window.open("", "_blank");

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

      if (data?.init_point && paymentWindow) {
        // ✅ redireciona a aba já aberta
        paymentWindow.location.href = data.init_point;

        // ✅ só ativa após garantir que abriu
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
        if (paymentWindow) paymentWindow.close();
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

              <motion.div className="mt-10">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className={`inline-block ${
                    loading ? "bg-gray-500 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                  } text-white font-semibold py-4 px-10 rounded-full`}
                >
                  {loading ? "Gerando link de pagamento..." : "ACESSAR MEU RESULTADO AGORA"}
                </button>
              </motion.div>
            </>
          ) : (
            <div className="py-12">
              {!paymentApproved ? (
                <>
                  <div className="w-12 h-12 border-4 border-t-orange-400 border-gray-700 rounded-full animate-spin mb-6"></div>
                  <p>Aguardando confirmação do pagamento...</p>
                </>
              ) : (
                <>
                  <p className="text-green-400">✅ Pagamento confirmado!</p>
                  <button onClick={() => window.location.href = `/resultado?ref=${referenceId}`}>
                    VER MEU RESULTADO
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
