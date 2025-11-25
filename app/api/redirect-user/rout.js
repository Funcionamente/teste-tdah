export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");

    if (!ref) {
      console.error("❌ Falta parâmetro ref no redirect-user");
      return new Response("Faltando referência", { status: 400 });
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    if (!BASE_URL) {
      console.error("❌ NEXT_PUBLIC_BASE_URL ausente");
      return new Response("Configuração incorreta", { status: 500 });
    }

    console.log(`🚀 Redirecionamento controlado para ref=${ref}`);

    // 🔧 Em vez de redirecionar de imediato, mostramos uma tela intermediária com auto-refresh
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verificando pagamento...</title>
          <style>
            body {
              background-color: #0a0a0a;
              color: #ffffff;
              font-family: sans-serif;
              text-align: center;
              padding-top: 20vh;
            }
            .spinner {
              width: 40px;
              height: 40px;
              border: 4px solid #ffb347;
              border-top-color: transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 20px auto;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            .msg {
              color: #ffb347;
              margin-top: 16px;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <div class="spinner"></div>
          <div class="msg">Pagamento confirmado! Verificando informações...</div>
          <script>
            // Aguarda 3 segundos e redireciona para a página de resultado
            setTimeout(() => {
              window.location.href = "${BASE_URL}/resultado?external_reference=${ref}&status=success";
            }, 3000);
          </script>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    console.error("💥 Erro em /api/redirect-user:", err);
    return new Response("Erro interno", { status: 500 });
  }
}
