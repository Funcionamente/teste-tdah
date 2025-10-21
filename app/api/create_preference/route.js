import { NextResponse } from "next/server";

/**
 * Body esperado:
 * { score: number }
 *
 * Retorna:
 * { init_point: string, referenceId: string }
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const APP_URL = process.env.APP_URL || "";

export async function POST(req) {
  try {
    const body = await req.json();
    const score = parseInt(body.score ?? 0, 10);
    if (Number.isNaN(score)) return NextResponse.json({ error: "score invalid" }, { status: 400 });

    // gerar um UUID simples (Node 18+)
    const referenceId = crypto.randomUUID();

    // inserir registro pending no Supabase via REST
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation"
      },
      body: JSON.stringify([{
        id: referenceId,
        score: score,
        status: "pending",
        metadata: { createdFrom: "teste", note: "aguardando pagamento" }
      }])
    });

    if (!insertRes.ok) {
      const text = await insertRes.text();
      console.error("Supabase insert error:", text);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }

    // Criar a preference no Mercado Pago
    // Endpoint oficial: POST https://api.mercadopago.com/checkout/preferences
    const prefBody = {
      items: [
        {
          title: "Acesso ao resultado + 2 e-books",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 4.99
        }
      ],
      external_reference: referenceId,
      metadata: { score: score },
      back_urls: {
        success: `${APP_URL}/resultado/${referenceId}`,
        failure: `${APP_URL}/checkout`,
        pending: `${APP_URL}/checkout`
      },
      auto_return: "approved"
    };

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(prefBody)
    });

    if (!mpRes.ok) {
      const txt = await mpRes.text();
      console.error("MP create preference error:", txt);
      return NextResponse.json({ error: "mercadopago error" }, { status: 502 });
    }

    const mpJson = await mpRes.json();
    // mpJson.init_point é o link para redirecionar ao checkout (Checkout Pro)
    return NextResponse.json({ init_point: mpJson.init_point, referenceId });
  } catch (err) {
    console.error("create_preference error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
