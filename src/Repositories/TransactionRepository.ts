import { TransactionInterface } from "../interfaces/TransactionInterface";
import Transaction from "../models/transaction";
export class TransactionRepository implements TransactionInterface {
  async store(userId: number, response: any, cart: any) {
    return await Transaction.create({
      user_id: userId,
      amount: cart.amount,
      transaction_result: response.trackId,
      type: 1,
      cart_id: cart.id,
    });
  }

  async find(paymentCode: string) {
    return await Transaction.findOne({
      where: { transaction_result: paymentCode },
    });
  }
  async failed(transactionId: number,transaction: any) {
    try {
      await Transaction.update(
        { type: 2 }, 
        { where: { id: transactionId } },
        {transaction}
      );
    } catch (err) {
      console.log(err);
    }
  }

  async success(transactionId: number){
    try {

      await Transaction.update({ type: 3 }, { where: { id: transactionId } });
    } catch (err) {
      console.log(err);
    }
  }
}
