import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📩 Webhook recebido:", JSON.stringify(body).slice(0, 400));

    let paymentId = body?.data?.id || body?.id;

    // 🧠 Corrige caso venha um link completo no campo "resource"
    if (!paymentId && body?.resource) {
      const match = body.resource.match(/\/payments\/(\d+)/);
      if (match) paymentId = match[1];
    }

    if (!paymentId) {
      console.warn("⚠️ Webhook recebido sem paymentId:", body);
      return NextResponse.json({ received: true });
    }

    // ✅ Consultar pagamento diretamente na API do Mercado Pago
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });

    if (!mpRes.ok) {
      const text = await mpRes.text();
      console.error("❌ Erro ao consultar pagamento no Mercado Pago:", text);
      return NextResponse.json({ error: "mp fetch error" }, { status: 502 });
    }

    const payment = await mpRes.json();
    console.log("💳 Pagamento consultado:", payment.id, payment.status);

    // ✅ Atualizar Supabase se o pagamento foi aprovado
    if (payment.status === "approved") {
      const externalRef = payment.external_reference;

      if (!externalRef) {
        console.warn("⚠️ Pagamento aprovado sem external_reference:", payment);
      } else {
        const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/payments?id=eq.${externalRef}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            status: "approved",
            mp_payment_id: payment.id,
            approved_at: new Date().toISOString(),
            metadata: payment,
          }),
        });

        if (!updateRes.ok) {
          console.error("❌ Falha ao atualizar Supabase:", await updateRes.text());
        } else {
          console.log(`✅ Pagamento aprovado e atualizado para ${externalRef}`);
        }
      }
    } else {
      console.log("ℹ️ Status do pagamento não é 'approved':", payment.status);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("💥 Erro no Webhook handler:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
