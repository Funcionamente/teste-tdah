import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export async function POST(req) {
  try {
    const body = await req.json();

    // Tenta extrair o paymentId de diferentes formatos de webhook do Mercado Pago
    const paymentId = body?.data?.id || body?.id || body?.data?.object?.id;

    if (!paymentId) {
      console.warn("⚠️ Webhook sem paymentId. Body parcial:", JSON.stringify(body).slice(0, 300));
      return NextResponse.json({ received: true });
    }

    // Busca detalhes do pagamento no Mercado Pago
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });

    if (!mpRes.ok) {
      const errText = await mpRes.text();
      console.error("❌ Erro ao consultar pagamento no Mercado Pago:", errText);
      return NextResponse.json({ error: "mp fetch error" }, { status: 502 });
    }

    const payment = await mpRes.json();

    // Verifica status do pagamento
    if (payment.status === "approved") {
      const externalRef = payment.external_reference;

      if (!externalRef) {
        console.error("❌ Pagamento aprovado, mas sem external_reference:", payment);
        return NextResponse.json({ error: "missing external_reference" }, { status: 400 });
      }

      if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.error("❌ Variáveis de ambiente ausentes:", { SUPABASE_URL, SUPABASE_KEY: !!SUPABASE_KEY });
        return NextResponse.json({ error: "missing supabase env vars" }, { status: 500 });
      }

      const updateUrl = `${SUPABASE_URL}/rest/v1/payments?id=eq.${externalRef}`;

      const updateRes = await fetch(updateUrl, {
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
        const errTxt = await updateRes.text();
        console.error("❌ Falha ao atualizar Supabase:", errTxt);
      } else {
        console.log(`✅ Pagamento aprovado e atualizado com sucesso: ${externalRef}`);
      }
    } else {
      console.log(`ℹ️ Pagamento com status '${payment.status}' para ID ${paymentId}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("💥 Webhook handler error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
