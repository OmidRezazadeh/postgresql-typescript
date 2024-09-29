
import { PaymentGateway } from "../interfaces/PaymentGateway";
import { Zarinpal } from "../utils/zarinPal";
export class ZarinPal implements PaymentGateway{
   async processPayment(cart:any){
        return await Zarinpal(cart);
    }
}