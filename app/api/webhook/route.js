// app/api/webhook/route.js
import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

function safeLogPrefix() {
  return new Date().toISOString();
}

export async function POST(req) {
  try {
    // Ler body como texto e tentar parsear de forma segura (evita surprises do runtime)
    const raw = await req.text();
    let body;
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (err) {
      console.warn(`${safeLogPrefix()} ⚠️ Webhook: body não é JSON válido, raw:`, raw.slice(0, 400));
      // responder 200 — não queremos que MP continue re-enviando por causa de parse
      return NextResponse.json({ received: true });
    }

    console.log(`${safeLogPrefix()} 📩 Webhook recebido:`, JSON.stringify(body).slice(0, 800));

    // IDENTIFICAR O TIPO DO EVENTO (diferentes propriedades aparecem em envios)
    const eventType = body.type || body.topic || body.event || body.action || null;

    // Se o evento NÃO for de pagamento, logamos e retornamos 200.
    // (merchant_order topics, topic_merchant_order_wh etc. não têm payment id)
    if (!eventType) {
      console.log(`${safeLogPrefix()} ℹ️ Evento sem type/topic - ignorando`);
      return NextResponse.json({ received: true });
    }

    // Normalizar alguns nomes comuns
    const normalized = String(eventType).toLowerCase();

    // Se for um merchant_order / topic_merchant_order_wh (pedido), apenas log e 200
    if (
      normalized.includes("merchant_order") ||
      normalized.includes("order") ||
      normalized === "topic_merchant_order_wh"
    ) {
      console.log(`${safeLogPrefix()} ℹ️ Evento de merchant_order ignorado (apenas log). type=${eventType}`);
      return NextResponse.json({ ignored: true });
    }

    // Tratar apenas eventos de payment
    if (!normalized.includes("payment")) {
      console.log(`${safeLogPrefix()} ℹ️ Evento não relacionado a pagamento: ${eventType} -> ignorando`);
      return NextResponse.json({ ignored: true });
    }

    // Extrair paymentId de forma resiliente
    // Mercado Pago geralmente envia em body.data.id
    let paymentId = null;
    if (body?.data?.id) paymentId = body.data.id;
    if (!paymentId && body?.id) paymentId = body.id;
    // Em alguns payloads vem resource/url: https://api.mercadopago.com/v1/payments/123
    if (!paymentId && body?.resource) {
      const match = String(body.resource).match(/\/payments\/(\d+)/);
      if (match) paymentId = match[1];
    }

    if (!paymentId) {
      console.warn(`${safeLogPrefix()} ⚠️ Webhook recebido sem paymentId válido. body:`, JSON.stringify(body).slice(0, 500));
      // Responder 200 para evitar retries; nada a fazer sem ID de pagamento
      return NextResponse.json({ received: true });
    }

    // Consultar pagamento no Mercado Pago
    const mpUrl = `https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`;
    const mpRes = await fetch(mpUrl, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });

    // Se não encontrar (404), log e responder 200 — pode ser o evento enviado antes do registro do payment.
    if (!mpRes.ok) {
      const text = await mpRes.text().catch(() => "(erro ao ler corpo)");
      console.error(`${safeLogPrefix()} ❌ Erro ao consultar pagamento no Mercado Pago (status ${mpRes.status}):`, text);
      // responder 200 para evitar que MP marque como falha contínua (podemos re-processar em outra notificação)
      return NextResponse.json({ received: true });
    }

    // ler JSON de forma segura
    let payment;
    try {
      payment = await mpRes.json();
    } catch (err) {
      console.error(`${safeLogPrefix()} ❌ Falha ao parsear JSON do MP:`, err);
      return NextResponse.json({ received: true });
    }

    console.log(`${safeLogPrefix()} 💳 Pagamento consultado: id=${payment.id} status=${payment.status}`);

    // Só atualizamos se aprovado
    if (payment.status === "approved") {
      const externalRef = payment.external_reference; // o referenceId que geramos e enviamos na preferência

      if (!externalRef) {
        console.warn(`${safeLogPrefix()} ⚠️ Pagamento aprovado sem external_reference:`, JSON.stringify(payment).slice(0, 400));
        return NextResponse.json({ received: true });
      }

      // Validar SUPABASE_URL
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.error(`${safeLogPrefix()} ❌ SUPABASE_URL/SUPABASE_KEY não configurados no ambiente`);
        return NextResponse.json({ received: true });
      }

      // Construir URL segura para REST
      const supaUrl = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/payments?id=eq.${encodeURIComponent(externalRef)}`;

      try {
        const updateRes = await fetch(supaUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            status: "approved",
            mp_payment_id: payment.id,
            approved_at: new Date().toISOString(),
            metadata: payment,
          }),
        });

        // Se supabase retornar erro, apenas logamos (não retornamos 500 para o MP)
        if (!updateRes.ok) {
          const t = await updateRes.text().catch(() => "(erro ao ler resposta do supa)");
          console.error(`${safeLogPrefix()} ❌ Falha ao atualizar Supabase (status ${updateRes.status}):`, t);
        } else {
          const updatedBody = await updateRes.json().catch(() => null);
          console.log(`${safeLogPrefix()} ✅ Pagamento aprovado e registro atualizado para externalRef=${externalRef}`, updatedBody);
        }
      } catch (err) {
        console.error(`${safeLogPrefix()} ❌ Erro ao chamar Supabase:`, err);
      }
    } else {
      console.log(`${safeLogPrefix()} ℹ️ Pagamento com status='${payment.status}', não será marcado como aprovado.`);
    }

    // Sempre retornar 200 OK para o Mercado Pago
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`${safeLogPrefix()} 💥 Erro no Webhook handler:`, err);
    // Retornar 500 somente em caso de erro crítico — mas preferível retornar 200 para evitar muitas retries do MP.
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
