"use client";

import { useEffect, useState } from "react";

export default function Resultado() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verificando pagamento...");
  const [ref, setRef] = useState(null);

  useEffect(() => {
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
          setMessage("✅ Pagamento confirmado! Preparando seu resultado...");

          // 🔥 NOVO: garantir que existe pontuação antes de redirecionar
          try {
            const resultRes = await fetch(
              `/api/get-resultado?ref=${encodeURIComponent(refParam)}`
            );
            const resultData = await resultRes.json();

            let pontuacao = resultData?.pontuacao;

            // 🧠 fallback para iPhone / perda de estado
            if (!pontuacao || pontuacao === 0) {
              const localScore = localStorage.getItem("tdah_score");
              const localRef = localStorage.getItem("tdah_ref");

              if (localScore && localRef === refParam) {
                console.log("🔁 Usando fallback do localStorage:", localScore);
                pontuacao = Number(localScore);
              }
            }

            // ⏳ Se ainda não tem pontuação, aguarda um pouco (webhook delay)
            if (!pontuacao || pontuacao === 0) {
              console.log("⏳ Pontuação ainda não disponível, aguardando...");
              setMessage("⏳ Finalizando processamento do seu resultado...");
              return;
            }

            // 🚀 Redireciona com segurança
            setTimeout(() => {
              window.location.href = `/resultado-final?ref=${refParam}`;
            }, 1500);
          } catch (err) {
            console.error("Erro ao validar resultado:", err);

            // fallback mesmo com erro
            setTimeout(() => {
              window.location.href = `/resultado-final?ref=${refParam}`;
            }, 2000);
          }
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
