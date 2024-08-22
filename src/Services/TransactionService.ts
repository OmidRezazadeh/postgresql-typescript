import { TransactionRepository } from "../Repositories/TransactionRepository";
import { payZibal } from "../utils/zarinPal";
const {connectDB} = require("../config/database");
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
    const transactionData = await this.transactionRepository.find(paymentCode);
    let transaction;
    const sequelize = connectDB;
    transaction = await sequelize.transaction();
    if (transactionData) {
      const transactionId = transactionData.id;
      if (paymentStatus === "3") {
        await this.transactionRepository.failed(transactionId,transaction);
      }else if(paymentCode ===  "2"){
        await this.transactionRepository.success(transactionId,transaction)
      }
    }
  }
}
