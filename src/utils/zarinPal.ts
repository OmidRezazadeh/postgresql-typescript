const ZarinpalCheckout = require("zarinpal-checkout");
const Zibal = require('zibal');
// "00000000-0000-0000-0000-000000000000"
const zarinpal = ZarinpalCheckout.create(
  "6cded376-3063-11e9-a98e-005056a205be",
  true
);







export async function pay(cart: any) {
try {

  const response = await zarinpal.PaymentRequest({
    Amount: cart.amount,
    CallbackURL: "http://localhost:3000/paycallback",
    Description: "پرداخت خرید",
  });
  return response;
}catch (err) {
  console.log(err);
}

}
const zibal = new Zibal({
 
  merchant: "zibal", // Your IPG's Merchant Id (You Can Get it From Zibal's Dashboard)
  callbackUrl: "http://localhost:3000/paycallback" // The URL Where User will be Redirected to After Payment
})
export async function payZibal(cart:any){

 return zibal.request({
    amount: cart.amount, // Required - In Rials
    orderId: cart.id, // Optional
    merchant: "zibal", // As Said Above, You can Specify merchant for Each Transaction too.
    callbackUrl: "http://localhost:3000/paycallback",
})

}

