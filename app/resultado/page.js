export default async function initResultado() {
  const container = document.getElementById("resultado-container") || document.body;
  container.style.cssText = "font-family: sans-serif; color: #fff; background:#000; text-align:center; padding-top:20vh;";

  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref") || urlParams.get("external_reference");

  if (!ref) {
    container.innerHTML = `<h2>❌ Erro: referência do pagamento não encontrada.</h2>`;
    return;
  }

  container.innerHTML = `
    <h2>🔄 Verificando pagamento...</h2>
    <p id="status-info">Por favor, aguarde alguns segundos.</p>
  `;

  async function checkStatus() {
    try {
      const res = await fetch(`/api/payment-status?ref=${encodeURIComponent(ref)}`);
      const data = await res.json();

      if (data?.status === "approved") {
        container.innerHTML = `
          <h2>✅ Pagamento confirmado!</h2>
          <p>Redirecionando para o resultado completo...</p>
        `;
        setTimeout(() => {
          window.location.href = `/resultado-final?ref=${ref}`;
        }, 2000);
      } else if (data?.status === "pending") {
        document.getElementById("status-info").innerText = "Pagamento ainda pendente...";
      } else if (data?.status === "unknown") {
        document.getElementById("status-info").innerText = "Ainda processando informações...";
      } else {
        document.getElementById("status-info").innerText = `Status: ${data?.status || "indefinido"}`;
      }
    } catch (err) {
      document.getElementById("status-info").innerText = "Erro ao consultar status. Tentando novamente...";
      console.error("Erro no resultado.js:", err);
    }
  }

  // Checa a cada 3 segundos até encontrar o status aprovado
  checkStatus();
  const interval = setInterval(checkStatus, 3000);

  // Para o loop depois de 2 minutos se não houver sucesso
  setTimeout(() => clearInterval(interval), 120000);
}

// Executa automaticamente quando a página é carregada
document.addEventListener("DOMContentLoaded", initResultado);
