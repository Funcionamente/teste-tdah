import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "https://teste-tdah-liard.vercel.app";

    if (!MP_ACCESS_TOKEN) {
      return NextResponse.json({ error: "MP_ACCESS_TOKEN ausente" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { referenceId = "ref_" + Date.now(), title = "Resultado + eBooks", price = 4.99 } = body;

    const preference = {
      items: [{ title, quantity: 1, currency_id: "BRL", unit_price: Number(price) }],
      external_reference: referenceId,
      back_urls: {
        success: `${DOMAIN}/resultado?ref=${referenceId}`,
        failure: `${DOMAIN}/checkout`,
        pending: `${DOMAIN}/checkout`,
      },
      auto_return: "approved",
      notification_url: `${DOMAIN}/api/webhook`,
    };

    const resp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    const data = await resp.text(); // pego o texto cru para debugar
    let parsed;
    try { parsed = JSON.parse(data); } catch (e) { parsed = null; }

    if (!resp.ok) {
      console.error("MP Preference error:", resp.status, data);
      // Retorna o corpo de erro direto ao frontend para debugar
      return NextResponse.json({ error: "MP error", status: resp.status, body: parsed ?? data }, { status: 502 });
    }

    // sucesso
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("create-preference handler error:", err);
    return NextResponse.json({ error: "internal", message: String(err) }, { status: 500 });
  }
}
