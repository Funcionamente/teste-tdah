import { NextResponse } from "next/server";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "https://teste-tdah-liard.vercel.app"; // ajuste para o seu domínio

export async function POST(req) {
  try {
    const body = await req.json();
    const { referenceId, title, price } = body;

    // Verificações básicas
    if (!referenceId || !title || !price) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    // Criação da preferência no Mercado Pago
    const preference = {
      items: [
        {
          title,
          quantity: 1,
          currency_id: "BRL",
          unit_price: parseFloat(price),
        },
      ],
      external_reference: referenceId, // usado para identificar o pagamento no webhook
      back_urls: {
        success: `${DOMAIN}/resultado?ref=${referenceId}`,
        failure: `${DOMAIN}/checkout`,
        pending: `${DOMAIN}/checkout`,
      },
      auto_return: "approved",
      notification_url: `${DOMAIN}/api/webhook`,
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Erro ao criar preferência MP:", errText);
      return NextResponse.json({ error: "Erro ao criar preferência" }, { status: 502 });
    }

    const data = await response.json();

    // Retorna o link de pagamento para o frontend
    return NextResponse.json({ init_point: data.init_point });
  } catch (error) {
    console.error("Erro create-payment:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
