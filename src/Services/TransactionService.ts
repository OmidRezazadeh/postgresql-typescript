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
    let transaction;
    let message;
    try {
      const transactionData = await this.transactionRepository.find(paymentCode);
      const sequelize = connectDB;
      transaction = await sequelize.transaction();
      if (transactionData) {
        const transactionId = transactionData.id;
        if (paymentStatus === "3") {
          await this.transactionRepository.failed(transactionId, transaction);
          
        }
        if (paymentStatus === "2") {
          console.log("paymentStatus");
          await this.transactionRepository.success(transactionId, transaction);
          message=" پرداخت موفق ";
        }
      }
      await transaction.commit();
      return message;
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.log(error);
    }
  }
}
