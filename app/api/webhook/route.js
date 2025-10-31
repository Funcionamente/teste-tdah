import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📩 Webhook recebido:", body);

    const { topic, resource, data } = body;
    let paymentId;

    // Normalização: dependendo da origem, o ID pode vir em locais diferentes
    if (topic === "payment") {
      paymentId = data?.id || resource?.split("/").pop();
    }

    if (!paymentId) {
      console.warn("⚠️ Webhook recebido sem paymentId:", body);
      return NextResponse.json({ status: "ignored" }, { status: 200 });
    }

    // Busca o pagamento diretamente (sem .json())
    const payment = await mercadopago.payment.findById(paymentId);
    console.log("✅ Pagamento encontrado:", payment.body);

    // Aqui você pode adicionar a lógica de verificação de status
    if (payment.body.status === "approved") {
      console.log("💰 Pagamento aprovado!");
      // 👉 atualizar seu banco de dados, liberar resultado, etc.
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("💥 Erro no Webhook handler:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
