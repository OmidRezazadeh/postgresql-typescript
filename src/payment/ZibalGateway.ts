
import { PaymentGateway } from "../interfaces/PaymentGateway";
import { payZibal } from "../utils/zarinPal";
export class Zibal implements PaymentGateway{
  async  processPayment(cart:any){
        return await payZibal(cart);
    }
}

