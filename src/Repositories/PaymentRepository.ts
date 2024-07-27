import { PaymentInterface } from "../interfaces/PaymentInterface";
export class PaymentRepository implements PaymentInterface {
  async create(data: any) {
    console.log(data);
  }
}
