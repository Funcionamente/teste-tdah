"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [retryTimeout, setRetryTimeout] = useState(null);

  // 🔥 NOVO: pegar o ref da URL (VINDO DO TESTE)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref) {
      setReferenceId(ref);
    } else {
      console.error("❌ REF NÃO ENCONTRADO NA URL");
      alert("Erro ao iniciar checkout. Ref não encontrado.");
    }
  }, []);

  // 🔧 Função principal de pagamento (CORRIGIDA)
  const handlePayment = async () => {
    if (!referenceId) {
      alert("Erro: referência inválida.");
      return;
    }

    setLoading(true);
    setAwaitingPayment(false);
    setPaymentApproved(false);

    try {
      // ✅ NÃO CRIA MAIS REF NOVO
      const ref = referenceId;

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
        paymentWindow.location.href = data.init_point;

        setAwaitingPayment(true);
        setLoading(false);

        const interval = setInterval(async () => {
          try {
            const res = await fetch(`/api/payment-status?ref=${ref}`);
            const result = await res.json();

            console.log("🔎 Status atual do pagamento:", result.status);

            if (result.status === "approved") {
              clearInterval(interval);
              localStorage.setItem("paymentSuccess", "true");
              setPaymentApproved(true);

              if (paymentWindow && !paymentWindow.closed) {
                paymentWindow.close();
              }

              console.log("✅ Pagamento aprovado!");

              setTimeout(() => {
                window.location.href = `/resultado?ref=${ref}`;
              }, 2000);
            }
          } catch (err) {
            console.error("Erro ao verificar status:", err);
          }
        }, 5000);

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

  useEffect(() => {
    localStorage.removeItem("paymentSuccess");
    if (retryTimeout) clearTimeout(retryTimeout);
  }, []);

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
        >
          🧠 Acesse o seu resultado completo e receba os seus 2 e-books agora mesmo
        </motion.h1>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-6 flex-1">
        <motion.div className="max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/10">
          {!awaitingPayment ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-orange-300">
                Por apenas R$4,99, você vai:
              </h2>

              <ul className="space-y-3 text-lg text-gray-200">
                <li>✔️ Descobrir o seu nível de atenção e foco</li>
                <li>✔️ Receber explicação detalhada</li>
                <li>✔️ Ganhar 2 e-books exclusivos</li>
              </ul>

              <div className="mt-10">
                <button
                  onClick={handlePayment}
                  disabled={loading || !referenceId}
                  className={`${
                    loading ? "bg-gray-500" : "bg-orange-500 hover:bg-orange-600"
                  } text-white font-semibold py-4 px-10 rounded-full`}
                >
                  {loading ? "Gerando link..." : "ACESSAR RESULTADO"}
                </button>
              </div>
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
                  <button
                    onClick={() =>
                      (window.location.href = `/resultado?ref=${referenceId}`)
                    }
                  >
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
