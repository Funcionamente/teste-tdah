export async function POST(req) {
  const now = new Date().toISOString();
  const log = (...args) => console.log(now, ...args);
  const error = (...args) => console.error(now, ...args);

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // 🚀 Adicionado

  try {
    const rawBody = await req.text();
    let body;
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      error("❌ Body inválido:", rawBody.slice(0, 500));
      return new Response("invalid body", { status: 200 });
    }

    log("📩 Webhook recebido:", JSON.stringify(body).slice(0, 800));

    const paymentId =
      body?.data?.id ||
      body?.id ||
      (body?.resource?.match(/\/payments\/(\d+)/)?.[1] ?? null);

    if (!paymentId) {
      error("⚠️ Sem paymentId válido no webhook:", JSON.stringify(body));
      return new Response("no payment id", { status: 200 });
    }

    // 🔎 Consulta o pagamento na API do Mercado Pago
    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });

    if (!paymentRes.ok) {
      const msg = await paymentRes.text().catch(() => "(erro ao ler corpo)");
      error(`❌ Erro ao consultar pagamento ${paymentId}:`, msg);
      return new Response("payment not ready", { status: 200 });
    }

    const payment = await paymentRes.json();
    log("💳 Pagamento recebido:", payment.id, payment.status);

    const externalRef = payment.external_reference;
    if (!externalRef) {
      error("⚠️ Pagamento sem external_reference:", payment.id);
      return new Response("ok", { status: 200 });
    }

    // 🗂️ Monta os dados para salvar no Supabase
    const paymentData = {
      id: externalRef,
      status: payment.status,
      mp_payment_id: payment.id,
      metadata: payment,
      approved_at: payment.status === "approved" ? new Date().toISOString() : null,
    };

    // ✅ UPSERT na tabela payments
    const supaPayment = await fetch(`${SUPABASE_URL}/rest/v1/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(paymentData),
    });

    if (!supaPayment.ok) {
      const txt = await supaPayment.text().catch(() => "(sem corpo)");
      error("❌ Falha ao inserir/atualizar tabela payments:", txt);
    } else {
      log("✅ Tabela payments atualizada com sucesso:", externalRef);
    }

    // ✅ Atualiza resultado existente, preservando pontuação
    const resultUrl = `${SUPABASE_URL}/rest/v1/resultados_teste?id_pagamento=eq.${externalRef}`;

    // 🔎 Verifica se já existe um resultado
    const checkRes = await fetch(resultUrl, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    let existingResults = [];

    for (let i = 0; i < 5; i++) {
      const retryRes = await fetch(resultUrl, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });
    
      existingResults = await retryRes.json();
    
      if (Array.isArray(existingResults) && existingResults.length > 0) {
        break;
      }
    
      // aguarda 500ms antes de tentar de novo
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (Array.isArray(existingResults) && existingResults.length > 0) {
      // 🔄 Atualiza SOMENTE o status (NÃO mexe na pontuação)
      const patchRes = await fetch(resultUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          status_pagamento: payment.status,
        }),
      });

      if (patchRes.ok) {
        log(`✅ Tabela resultados_teste atualizada para: ${payment.status}`);
      } else {
        const txt = await patchRes.text().catch(() => "(sem corpo)");
        error("⚠️ Falha ao atualizar resultados_teste:", txt);
      }
    } else {
      // ❌ NÃO CRIA MAIS REGISTRO AQUI
      error(`⚠️ Resultado NÃO encontrado para ${externalRef} — isso não deveria acontecer`);
    }

    // 🚀 Redireciona automaticamente se aprovado
    if (payment.status === "approved" && BASE_URL) {
      log("🚀 Pagamento aprovado! Chamando redirect-user...");
      fetch(`${BASE_URL}/api/redirect-user?ref=${externalRef}`)
        .then(() => log(`🔗 Redirecionamento disparado para ref=${externalRef}`))
        .catch((err) => error("❌ Erro ao chamar redirect-user:", err));
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    error("💥 Erro no Webhook handler:", err);
    return new Response("ok", { status: 200 });
  }
}
