import MercadoPago from "mercadopago";
MercadoPago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

const preference = await MercadoPago.preferences.create({
  items: [
    {
      title: "Acesso ao Resultado + 2 E-books",
      quantity: 1,
      currency_id: "BRL",
      unit_price: 4.99
    }
  ],
  external_reference: seuIdentificadorUsuarioOuSessão,
  metadata: {
    score: pontuacaoDoTeste  // valor que você salvou após o teste
  },
  back_urls: {
    success: "https://seusite.com/resultado",
    failure: "https://seusite.com/checkout"
  },
  auto_return: "approved"
});
