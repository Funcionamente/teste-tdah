import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export async function POST(req) {
  try {
    const body = await req.json();

    // Mercado Pago costuma enviar o payment id em body.data.id (ou body.data?.id)
    // ou em different shapes depending on the event. Try a few places:
    const paymentId = body?.data?.id || body?.id || body?.data?.object?.id;

    if (!paymentId) {
      // nothing to do
      console.log("Webhook received without payment id, body:", JSON.stringify(body).slice(0,200));
      return NextResponse.json({ received: true });
    }

    // Confirmar pagamento consultando a API do Mercado Pago
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` }
    });

    if (!mpRes.ok) {
      console.error("Erro ao buscar payment MP:", await mpRes.text());
      return NextResponse.json({ error: "mp fetch error" }, { status: 502 });
    }

    const payment = await mpRes.json();

    // Verifique status
    if (payment.status === "approved") {
      const externalRef = payment.external_reference; // esse é o referenceId que criamos
      // Atualizar registro no Supabase
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
          metadata: payment
        })
      });

      if (!updateRes.ok) {
        console.error("Supabase update failed:", await updateRes.text());
      } else {
        console.log(`Payment approved and record updated for ${externalRef}`);
      }
    } else {
      console.log("Payment status not approved:", payment.status);
      // opcional: atualizar como 'failed' ou 'pending'
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
