const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Dados recebidos:", body);

    const { referenceId, title, price } = body;

    if (!MP_ACCESS_TOKEN) {
      console.error("❌ Falta MP_ACCESS_TOKEN no ambiente");
      return new Response(
        JSON.stringify({ error: "Faltando token do Mercado Pago" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!BASE_URL) {
      console.error("❌ Falta NEXT_PUBLIC_BASE_URL no ambiente");
      return new Response(
        JSON.stringify({ error: "Faltando BASE_URL" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Criação da preferência com redirecionamento correto
    const preferenceData = {
      items: [
        {
          id: referenceId,
          title,
          quantity: 1,
          currency_id: "BRL",
          unit_price: Number(price),
          category_id: "digital_goods",
          description: "Acesso ao resultado completo e eBooks digitais exclusivos",
        },
      ],
      external_reference: referenceId, //  usado para buscar status depois
      statement_descriptor: "TESTETDAH",
      notification_url: `${BASE_URL}/api/webhook`,
      back_urls: {
        success: `${BASE_URL}/resultado?external_reference=${referenceId}`,
        failure: `${BASE_URL}/resultado?external_reference=${referenceId}`,
        pending: `${BASE_URL}/resultado?external_reference=${referenceId}`,
      },
      auto_return: "approved", // 🔁 redireciona automaticamente quando aprovado
    };

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferenceData),
    });

    const rawText = await mpRes.text();
    console.log("📥 Resposta bruta MP:", rawText.slice(0, 300));

    let result;
    try {
      result = JSON.parse(rawText);
    } catch (err) {
      console.error("❌ Resposta não é JSON válida:", err);
      return new Response(
        JSON.stringify({ error: "Invalid JSON response", raw: rawText }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!mpRes.ok) {
      console.error("❌ Erro do Mercado Pago:", result);
      return new Response(
        JSON.stringify({ error: "MercadoPago Error", details: result }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Preferência criada:", result.id);
    console.log("🔗 Link de pagamento:", result.init_point);
    console.log("🔙 Back URLs configuradas:", preferenceData.back_urls);

    // ✅ Ajuste: incluir o ID da preferência no retorno
    return new Response(
      JSON.stringify({
        id: result.id, // 🆕 Necessário para o checkout embed
        init_point: result.init_point, // Mantido para compatibilidade
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("💥 Erro ao criar preferência:", error);
    return new Response(
      JSON.stringify({ 
        init_point: result.init_point,
        id: result.id, // adiciona o ID da preferência
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
