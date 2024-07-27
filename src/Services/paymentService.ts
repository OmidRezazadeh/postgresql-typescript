import { PaymentRepository } from "../Repositories/PaymentRepository";
export class PaymentService {
  private paymentRepository: PaymentRepository;
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }
  async pay(data: any) {
    console.log(data);
  }
}
