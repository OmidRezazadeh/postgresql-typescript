import { TransactionInterface } from "../interfaces/TransactionInterface";
import Transaction from "../models/transaction";
export class TransactionRepository implements TransactionInterface {
  async store(userId: number, response: any, cart: any) {

    return await Transaction.create({
      user_id: userId,
      amount: cart.amount,
      transaction_result: response.authority,
      type: 1,
      cart_id: cart.id,
    }); 
  }
}
