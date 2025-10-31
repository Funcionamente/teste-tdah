import { MercadoPagoConfig, Preference } from "mercadopago";


export async function POST(request) {
  try {
    const body = await request.json();

    console.log("📦 Dados recebidos:", body);
    console.log("🔑 Access token presente?", !!process.env.MP_ACCESS_TOKEN);

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

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
        notification_url: "https://teste-tdah-liard.vercel.app/api/webhook",
      },
    });

    console.log("✅ Preferência criada:", result.id);
    console.log("🔗 Link:", result.init_point);

    return new Response(
      JSON.stringify({
        init_point: result.init_point,
        id: result.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Erro ao criar preferência:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro interno no servidor",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
