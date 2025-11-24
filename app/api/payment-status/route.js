export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");
    if (!ref) return new Response(JSON.stringify({ error: "missing ref" }), { status: 400 });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return new Response(
        JSON.stringify({ error: "server misconfigured" }),
        { status: 500 }
      );
    }

    // 🔍 Consulta pelo ID da referência (ex: "ref_1763743130776")
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/payments?id=eq.${encodeURIComponent(ref)}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      }
    );

    if (!res.ok) {
      const txt = await res.text().catch(() => "(no body)");
      return new Response(
        JSON.stringify({ error: "supabase error", details: txt }),
        { status: 502 }
      );
    }

    const rows = await res.json();
    const payment = Array.isArray(rows) ? rows[0] : rows;
    const status = payment?.status ?? null;

    // ✅ Retorna status sempre padronizado
    return new Response(
      JSON.stringify({
        status: status || "unknown",
        mp_payment_id: payment?.mp_payment_id ?? null,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("payment-status error:", err);
    return new Response(
      JSON.stringify({ error: "internal", details: err.message }),
      { status: 500 }
    );
  }
}
