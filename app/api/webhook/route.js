export async function POST(req) {
  const now = new Date().toISOString();
  const log = (...args) => console.log(now, ...args);
  const error = (...args) => console.error(now, ...args);

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

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

    const eventType = body.type || body.topic || body.action || "";
    const normalized = String(eventType).toLowerCase();

    // Ignora merchant_order e topic_merchant_order_wh
    if (
      normalized.includes("merchant_order") ||
      normalized === "topic_merchant_order_wh"
    ) {
      log("ℹ️ Evento de merchant_order ignorado (apenas log). type=", eventType);
      return new Response("ok", { status: 200 });
    }

    // Trata apenas pagamentos
    if (!normalized.includes("payment")) {
      log("ℹ️ Evento não relacionado a pagamento:", eventType);
      return new Response("ok", { status: 200 });
    }

    // Extrair paymentId
    let paymentId =
      body?.data?.id ||
      body?.id ||
      (body?.resource?.match(/\/payments\/(\d+)/)?.[1] ?? null);

    if (!paymentId) {
      error("⚠️ Sem paymentId válido no webhook:", JSON.stringify(body));
      return new Response("no payment id", { status: 200 });
    }

    // Consultar pagamento no Mercado Pago
    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
      }
    );

    if (!paymentRes.ok) {
      const msg = await paymentRes.text().catch(() => "(erro ao ler corpo)");
      error(`❌ Erro ao consultar pagamento ${paymentId}:`, msg);
      return new Response("payment not ready", { status: 200 });
    }

    const payment = await paymentRes.json();
    log("💳 Pagamento recebido:", payment.id, payment.status);

    if (payment.status === "approved") {
      const externalRef = payment.external_reference;
      if (!externalRef) {
        error("⚠️ Pagamento sem external_reference:", payment.id);
        return new Response("ok", { status: 200 });
      }

      // Atualizar Supabase
      const supaRes = await fetch(
        `${SUPABASE_URL}/rest/v1/payments?id=eq.${encodeURIComponent(
          externalRef
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            status: "approved",
            mp_payment_id: payment.id,
            approved_at: new Date().toISOString(),
            metadata: payment,
          }),
        }
      );

      if (!supaRes.ok) {
        const txt = await supaRes.text().catch(() => "(sem corpo)");
        error("❌ Falha ao atualizar Supabase:", txt);
      } else {
        log("✅ Supabase atualizado com sucesso para:", externalRef);
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    error("💥 Erro no Webhook handler:", err);
    // Importante: retornar 200 mesmo em falha para não gerar retries
    return new Response("ok", { status: 200 });
  }
}
