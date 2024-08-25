import { TransactionRepository } from "../Repositories/TransactionRepository";
import { payZibal } from "../utils/zarinPal";
const { connectDB } = require("../config/database");
export class TransactionService {
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  async pay(cart: any) {
    return await payZibal(cart);
  }
  async store(userId: number, response: any, cart: any) {
    return await this.transactionRepository.store(userId, response, cart);
  }

  async processTransaction(paymentCode: any, paymentStatus: any) {

    let message;
    try {
      const transactionData = await this.transactionRepository.find(paymentCode);

      if (transactionData) {
        const transactionId = transactionData.id;
        if (paymentStatus === "3") {
          await this.transactionRepository.failed(transactionId);
          
        }
        if (paymentStatus === "2") {
          console.log("paymentStatus");
          await this.transactionRepository.success(transactionId);
          message=" پرداخت موفق ";
        }
      }
    
      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
