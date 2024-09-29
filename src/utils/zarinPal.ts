import { response } from "express";

const ZarinpalCheckout = require("zarinpal-checkout");
const Zibal = require('zibal');
const zarinpal = ZarinpalCheckout.create(
  "6cded376-3063-11e9-a98e-005056a205be",
  true
);







export async function Zarinpal(cart: any) {
  try {
    const result = await zarinpal.PaymentRequest({
      Amount: cart.amount,
      CallbackURL: "http://localhost:3000/paycallback",
      Description: "پرداخت خرید",
    });
    return result; // Resolve the promise and return the result
  } catch (error) {
    console.error("Payment request error:", error);
    throw error; // Throw the error so it can be handled by the caller
  }


}
const zibal = new Zibal({
 
  merchant: "zibal", // Your IPG's Merchant Id (You Can Get it From Zibal's Dashboard)
  callbackUrl: "http://localhost:3000/paycallback" // The URL Where User will be Redirected to After Payment
})
export async function payZibal(cart:any){

 const response = zibal.request({
    amount: cart.amount, // Required - In Rials
    orderId: cart.id, // Optional
    merchant: "zibal", // As Said Above, You can Specify merchant for Each Transaction too.
    callbackUrl: "http://localhost:3000/paycallback",
})
return response.paymentUrl
}

