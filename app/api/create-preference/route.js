import { NextResponse } from "next/server";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Dados recebidos:", body);

    const { referenceId, title, price } = body;

    if (!MP_ACCESS_TOKEN) {
      console.error("❌ Token do Mercado Pago não encontrado");
      return NextResponse.json({ error: "missing access token" }, { status: 500 });
    }

    if (!BASE_URL) {
      console.error("❌ NEXT_PUBLIC_BASE_URL não definido no .env");
      return NextResponse.json({ error: "missing base url" }, { status: 500 });
    }

    // 🔗 Criar preferência diretamente pela API REST do Mercado Pago
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: referenceId,
            title,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(price),
          },
        ],
        external_reference: referenceId, // ✅ campo obrigatório para correlacionar com seu sistema
        back_urls: {
          success: `${BASE_URL}/resultado?status=success`,
          failure: `${BASE_URL}/resultado?status=failure`,
          pending: `${BASE_URL}/resultado?status=pending`,
        },
        auto_return: "approved",
      }),
    });

    // ⚠️ Correção do erro "a.json is not a function"
    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Erro na resposta do Mercado Pago:", result);
      return NextResponse.json({ error: "mercadopago error", details: result }, { status: 500 });
    }

    console.log("✅ Preferência criada:", result.id);
    console.log("🔗 Link:", result.init_point);

    return NextResponse.json({ init_point: result.init_point });

  } catch (error) {
    console.error("❌ Erro ao criar preferência:", error);
    return NextResponse.json({ error: error.message || "internal server error" }, { status: 500 });
  }
}
