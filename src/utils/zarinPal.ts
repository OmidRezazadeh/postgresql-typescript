const ZarinpalCheckout = require("zarinpal-checkout");

const zarinpal = ZarinpalCheckout.create(
  "00000000-0000-0000-0000-000000000000",
  true
);
export async function pay(cart: any) {

  const response = await zarinpal.PaymentRequest({
    Amount: cart.amount,
    CallbackURL: "http://localhost:3000/paycallback",
    Description: "پرداخت خرید",
  });

return response;
}

