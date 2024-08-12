import { TransactionRepository } from "../Repositories/TransactionRepository";
import {pay} from "../utils/zarinPal";

export class TransactionService {
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  async pay(cart: any) {

   return await pay(cart);

  }
  async store(userId:number, response: any,cart: any) {

    return await this.transactionRepository.store(userId, response,cart);
  }
}
