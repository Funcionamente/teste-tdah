​import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("📦 Dados recebidos:", body);

    const { referenceId, title, price } = body;

    if (!MP_ACCESS_TOKEN) {
      console.error("❌ Token do Mercado Pago não encontrado");
      return NextResponse.json({ error: "missing access token" }, { status: 500 });
    }

    const client = new MercadoPagoConfig({
      accessToken: MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const preferenceData = {
      items: [
        {
          id: referenceId,
          title,
          quantity: 1,
          currency_id: "BRL",
          unit_price: Number(price),
        },
      ],
      // 🔗 Muito importante: identificador interno do seu sistema
      external_reference: referenceId,

      // 🔁 URLs de retorno automático após pagamento
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/resultado?status=success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/resultado?status=failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/resultado?status=pending`,
      },
      auto_return: "approved",
    };

    const result = await preference.create({ body: preferenceData });

    console.log("✅ Preferência criada:", result.id);
    console.log("🔗 Link:", result.init_point);

    return NextResponse.json({ init_point: result.init_point });

  } catch (error) {
    console.error("❌ Erro ao criar preferência:", error);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
