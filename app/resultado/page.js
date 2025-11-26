"use client"; // garante que roda apenas no navegador

import { useEffect, useState } from "react";

export default function Resultado() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verificando pagamento...");
  const [ref, setRef] = useState(null);

  useEffect(() => {
    // garante que roda apenas no client
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref") || urlParams.get("external_reference");
    if (!refParam) {
      setStatus("error");
      setMessage("❌ Erro: referência do pagamento não encontrada.");
      return;
    }

    setRef(refParam);
    setStatus("checking");
    setMessage("🔄 Verificando pagamento...");

    async function checkStatus() {
      try {
        const res = await fetch(`/api/payment-status?ref=${encodeURIComponent(refParam)}`);
        const data = await res.json();

        if (data?.status === "approved") {
          setStatus("approved");
          setMessage("✅ Pagamento confirmado! Redirecionando para o resultado completo...");
          setTimeout(() => {
            window.location.href = `/resultado-final?ref=${refParam}`;
          }, 2000);
        } else if (data?.status === "pending") {
          setStatus("pending");
          setMessage("⌛ Pagamento pendente. Aguarde a confirmação...");
        } else if (data?.status === "unknown") {
          setStatus("unknown");
          setMessage("⚙️ Processando informações...");
        } else {
          setStatus("error");
          setMessage(`❌ Status inesperado: ${data?.status || "indefinido"}`);
        }
      } catch (err) {
        console.error("Erro ao verificar status:", err);
        setStatus("error");
        setMessage("Erro ao consultar status. Tentando novamente...");
      }
    }

    // faz polling até o status mudar para "approved"
    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    const timeout = setTimeout(() => clearInterval(interval), 120000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        color: "#fff",
        background: "#000",
        textAlign: "center",
        paddingTop: "20vh",
        minHeight: "100vh",
      }}
    >
      <h2>{message}</h2>
      {ref && <p style={{ opacity: 0.5 }}>Ref: {ref}</p>}
    </div>
  );
}
