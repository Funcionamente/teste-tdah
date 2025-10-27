import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request) {
  try {
    const body = await request.json();

    // Cria cliente Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN, // definido nas variáveis do Vercel
    });

    // Cria uma nova preferência
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: body.title || "Acesso ao Resultado Completo + 2 eBooks",
            quantity: 1,
            currency_id: "BRL",
            unit_price: body.price || 4.99,
          },
        ],
        back_urls: {
          success: "https://teste-tdah-liard.vercel.app/resultado",
          failure: "https://teste-tdah-liard.vercel.app/checkout",
          pending: "https://teste-tdah-liard.vercel.app/checkout",
        },
        auto_return: "approved",
        external_reference: body.referenceId || "ref_" + Date.now(),
        notification_url: "https://teste-tdah-liard.vercel.app/api/webhook", // webhook opcional
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
