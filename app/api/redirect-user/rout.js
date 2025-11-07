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

    console.log(`🚀 Redirecionando automaticamente para /resultado ref=${ref}`);

    // Redireciona o navegador do usuário (302)
    return Response.redirect(
      `${BASE_URL}/resultado?external_reference=${ref}&status=success`,
      302
    );
  } catch (err) {
    console.error("💥 Erro em /api/redirect-user:", err);
    return new Response("Erro interno", { status: 500 });
  }
}
