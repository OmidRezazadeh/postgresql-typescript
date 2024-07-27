import { Request, Response, NextFunction } from "express";
import { PaymentRepository } from '../Repositories/PaymentRepository';
import { PaymentService } from "../Services/paymentService";
class paymentController {
  private paymentService: PaymentService;
  constructor(paymentService: PaymentService) {
    this.paymentService = paymentService;
  }
  async pay(req: Request, res: Response, next: NextFunction) {

  }
}


const paymentRepository =new PaymentRepository()
const paymentService = new PaymentService(paymentRepository);
const PaymentController = new paymentController(paymentService);
export {PaymentController}