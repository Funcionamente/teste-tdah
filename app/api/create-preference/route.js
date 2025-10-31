import { NextResponse } from "next/server";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Dados recebidos:", body);

    const { referenceId, title, price } = body;

    if (!MP_ACCESS_TOKEN) {
      return NextResponse.json({ error: "Faltando token do Mercado Pago" }, { status: 500 });
    }

    if (!BASE_URL) {
      return NextResponse.json({ error: "Faltando BASE_URL" }, { status: 500 });
    }

    // ✅ Criar a preferência via API REST do Mercado Pago
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
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
        external_reference: referenceId, // 🧩 obrigatório para correlacionar com seu sistema
        back_urls: {
          success: `${BASE_URL}/resultado?status=success`,
          failure: `${BASE_URL}/resultado?status=failure`,
          pending: `${BASE_URL}/resultado?status=pending`,
        },
        auto_return: "approved",
      }),
    });

    // ⚙️ Verificar tipo de resposta antes de chamar .json()
    let resultText = await mpRes.text();
    let result;

    try {
      result = JSON.parse(resultText);
    } catch {
      console.error("❌ Resposta não é JSON válida:", resultText);
      return NextResponse.json({ error: "Invalid JSON response", raw: resultText }, { status: 500 });
    }

    if (!mpRes.ok) {
      console.error("❌ Erro na resposta do Mercado Pago:", result);
      return NextResponse.json({ error: "MercadoPago Error", details: result }, { status: 500 });
    }

    console.log("✅ Preferência criada:", result.id);
    console.log("🔗 Link:", result.init_point);

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("💥 Erro ao criar preferência:", error);
    return NextResponse.json({ error: error.message || "Erro interno" }, { status: 500 });
  }
}
