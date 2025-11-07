export async function POST(req) {
  const now = new Date().toISOString();
  const log = (...args) => console.log(now, ...args);
  const error = (...args) => console.error(now, ...args);

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // 🚀 Adicionado

  try {
    const rawBody = await req.text();
    let body;
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      error("❌ Body inválido:", rawBody.slice(0, 500));
      return new Response("invalid body", { status: 200 });
    }

    log("📩 Webhook recebido:", JSON.stringify(body).slice(0, 800));

    const paymentId =
      body?.data?.id ||
      body?.id ||
      (body?.resource?.match(/\/payments\/(\d+)/)?.[1] ?? null);

    if (!paymentId) {
      error("⚠️ Sem paymentId válido no webhook:", JSON.stringify(body));
      return new Response("no payment id", { status: 200 });
    }

    // 🔎 Consulta o pagamento na API do Mercado Pago
    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });

    if (!paymentRes.ok) {
      const msg = await paymentRes.text().catch(() => "(erro ao ler corpo)");
      error(`❌ Erro ao consultar pagamento ${paymentId}:`, msg);
      return new Response("payment not ready", { status: 200 });
    }

    const payment = await paymentRes.json();
    log("💳 Pagamento recebido:", payment.id, payment.status);

    const externalRef = payment.external_reference;
    if (!externalRef) {
      error("⚠️ Pagamento sem external_reference:", payment.id);
      return new Response("ok", { status: 200 });
    }

    // 🗂️ Monta os dados para salvar no Supabase
    const paymentData = {
      id: externalRef,
      status: payment.status,
      mp_payment_id: payment.id,
      metadata: payment,
      approved_at: payment.status === "approved" ? new Date().toISOString() : null,
    };

    // ✅ UPSERT na tabela payments
    const supaPayment = await fetch(`${SUPABASE_URL}/rest/v1/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(paymentData),
    });

    if (!supaPayment.ok) {
      const txt = await supaPayment.text().catch(() => "(sem corpo)");
      error("❌ Falha ao inserir/atualizar tabela payments:", txt);
    } else {
      log("✅ Tabela payments atualizada com sucesso:", externalRef);
    }

    // ✅ UPSERT na tabela resultados_teste
    const supaResult = await fetch(`${SUPABASE_URL}/rest/v1/resultados_teste`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        id_pagamento: externalRef,
        status_pagamento: payment.status,
      }),
    });

    if (!supaResult.ok) {
      const txt = await supaResult.text().catch(() => "(sem corpo)");
      error("⚠️ Falha ao inserir/atualizar tabela resultados_teste:", txt);
    } else {
      log("✅ Tabela resultados_teste atualizada para:", payment.status);
    }

    // 🚀 Adicionado: Se pagamento foi aprovado, chama o redirect-user
    if (payment.status === "approved" && BASE_URL) {
      log("🚀 Pagamento aprovado! Chamando redirect-user...");
      fetch(`${BASE_URL}/api/redirect-user?ref=${externalRef}`)
        .then(() => log(`🔗 Redirecionamento disparado para ref=${externalRef}`))
        .catch((err) => error("❌ Erro ao chamar redirect-user:", err));
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    error("💥 Erro no Webhook handler:", err);
    return new Response("ok", { status: 200 });
  }
}
