import { Request, Response, NextFunction } from "express";
import { PaymentRepository } from "../Repositories/PaymentRepository";
import { PaymentService } from "../Services/paymentService";
const ZarinpalCheckout = require("zarinpal-checkout");
const zarinpal = ZarinpalCheckout.create(
  "00000000-0000-0000-0000-000000000000",
  true
);

class paymentController {
  private paymentService: PaymentService;
  constructor(paymentService: PaymentService) {
    this.paymentService = paymentService;
  }
  async pay(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await zarinpal.PaymentRequest({
        Amount: "100000",
        CallbackURL: "http://localhost:3000/paycallback",
        Description: "تست",
      });
    res.status(200).json(response.url);

    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  async verifyPayment(req: Request, res: Response, next: NextFunction) {



  }
}

const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService(paymentRepository);
const PaymentController = new paymentController(paymentService);
export { PaymentController };
