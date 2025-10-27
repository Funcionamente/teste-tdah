import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

// ⚙️ Configuração do Mercado Pago com sua Access Token
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // defina isso no .env.local
});

export async function POST(req) {
  try {
    const body = await req.json();

    // Cria a preferência de pagamento
    const preference = {
      items: [
        {
          id: body.referenceId,
          title: body.title || "Produto",
          quantity: 1,
          unit_price: Number(body.price) || 4.99,
          currency_id: "BRL",
        },
      ],
      back_urls: {
        success: "https://teste-tdah-liard.vercel.app/sucesso",
        failure: "https://teste-tdah-liard.vercel.app/erro",
        pending: "https://teste-tdah-liard.vercel.app/pendente",
      },
      auto_return: "approved",
      external_reference: body.referenceId,
    };

    const result = await mercadopago.preferences.create(preference);

    return NextResponse.json({
      init_point: result.body.init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json(
      { error: "Erro ao criar preferência" },
      { status: 500 }
    );
  }
}
