import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request) {
  try {​
    const body = await request.json();

    console.log("📦 Dados recebidos:", body);
    console.log("🔑 Access token presente?", !!process.env.MP_ACCESS_TOKEN);

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    // Cria um ID de referência único (session_id)
    const sessionId = body.referenceId || "sess_" + Date.now();

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
          success: `https://teste-tdah-liard.vercel.app/resultado?session_id=${sessionId}&status=success`,
          failure: `https://teste-tdah-liard.vercel.app/resultado?session_id=${sessionId}&status=failure`,
          pending: `https://teste-tdah-liard.vercel.app/resultado?session_id=${sessionId}&status=pending`,
        },
        auto_return: "approved", // redireciona automaticamente após o pagamento
        external_reference: sessionId,
      },
    });

    console.log("✅ Preferência criada:", result.id);
    console.log("🔗 Link:", result.init_point);

    // 🚀 Retorno manual com Response (corrige o erro .json)
    return new Response(
      JSON.stringify({
        init_point: result.init_point,
        id: result.id,
        session_id: sessionId,
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
