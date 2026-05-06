export async function POST(req) {
  const now = new Date().toISOString();
  const log = (...args) => console.log(now, ...args);
  const error = (...args) => console.error(now, ...args);

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

    // 🔥 BUSCA score existente antes de atualizar
    let existingScore = 0;

    try {
      const existingPaymentRes = await fetch(
        `${SUPABASE_URL}/rest/v1/payments?id=eq.${externalRef}&select=score`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      const existingPayment = await existingPaymentRes.json();

      if (Array.isArray(existingPayment) && existingPayment.length > 0) {
        existingScore = existingPayment[0]?.score ?? 0;
      }
    } catch (err) {
      error("⚠️ Erro ao buscar score existente:", err);
    }

    // 🗂️ Monta os dados preservando score
    const paymentData = {
      id: externalRef,
      score: existingScore, // 🔥 ESSENCIAL
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
        Prefer: "resolution=merge-duplicates,on_conflict=id",
      },
      body: JSON.stringify(paymentData),
    });

    if (!supaPayment.ok) {
      const txt = await supaPayment.text().catch(() => "(sem corpo)");
      error("❌ Falha ao inserir/atualizar tabela payments:", txt);
    } else {
      log("✅ Tabela payments atualizada com sucesso:", externalRef);
    }

    // 🔎 Busca resultado com retry
    const resultUrl = `${SUPABASE_URL}/rest/v1/resultados_teste?id_pagamento=eq.${externalRef}`;

    let existingResults = [];

    for (let i = 0; i < 8; i++) {
      const retryRes = await fetch(resultUrl, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });

      existingResults = await retryRes.json();

      if (Array.isArray(existingResults) && existingResults.length > 0) {
        log(`✅ Resultado encontrado na tentativa ${i + 1}`);
        break;
      }

      log(`⏳ Resultado ainda não encontrado (tentativa ${i + 1})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (Array.isArray(existingResults) && existingResults.length > 0) {
      const patchRes = await fetch(resultUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          status_pagamento: payment.status,
        }),
      });

      if (patchRes.ok) {
        log(`✅ Tabela resultados_teste atualizada para: ${payment.status}`);
      } else {
        const txt = await patchRes.text().catch(() => "(sem corpo)");
        error("⚠️ Falha ao atualizar resultados_teste:", txt);
      }
    } else {
      error(`⚠️ Resultado NÃO encontrado para ${externalRef} — isso não deveria acontecer`);
    }

    // 🚀 Redirecionamento automático
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
