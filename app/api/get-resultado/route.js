export async function GET(req) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");

    if (!ref) {
      return new Response(JSON.stringify({ error: "ref não informado" }), {
        status: 400,
      });
    }

    // 🔎 Busca o resultado pelo id_pagamento
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/resultados_teste?id_pagamento=eq.${ref}&select=*`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    const data = await res.json();

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ status: "not_found" }), {
        status: 404,
      });
    }

    const resultado = data[0];

    return new Response(
      JSON.stringify({
        status: resultado.status_pagamento,
        pontuacao: resultado.pontuacao,
        interpretacao: resultado.interpretacao,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro ao buscar resultado:", err);
    return new Response(JSON.stringify({ error: "erro interno" }), {
      status: 500,
    });
  }
}
