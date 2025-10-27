import { NextResponse } from "next/server";

export async function POST() {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "Resultado do Teste + 2 eBooks Exclusivos",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 4.99,
          },
        ],
        back_urls: {
          success: "https://teste-tdah-liard.vercel.app/resultado",
          failure: "https://teste-tdah-liard.vercel.app/checkout",
          pending: "https://teste-tdah-liard.vercel.app/checkout",
        },
        auto_return: "approved",
        notification_url: "https://teste-tdah-liard.vercel.app/api/webhook",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Mercado Pago:", data);
      return NextResponse.json({ error: "Erro ao criar preferência" }, { status: 500 });
    }

    return NextResponse.json({ init_point: data.init_point });
  } catch (error) {
    console.error("Erro geral:", error);
    return NextResponse.json({ error: "Erro ao iniciar pagamento" }, { status: 500 });
  }
}
