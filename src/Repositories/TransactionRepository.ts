import { TransactionInterface } from "../interfaces/TransactionInterface";
import Cart from "../models/cart";
import Transaction from "../models/transaction";
import CartItem from "../models/cartItem";
import Product from "../models/product";

// TransactionRepository class implements the TransactionInterface
export class TransactionRepository implements TransactionInterface {

  // The 'store' method creates a new transaction record
  async store(userId: number, response: any, cart: any) {

    return await Transaction.create({
      user_id: userId, // ID of the user making the transaction
      amount: cart.amount, // Total amount of the transaction from the cart
      transaction_result:response.trackId , // Unique track ID from the payment gateway response
      type: 1, // Initial transaction type (e.g., 1 for pending)
      cart_id: cart.id, // ID of the associated cart
    });
  }

  // The 'find' method retrieves a transaction by its payment code
  async find(paymentCode: string) {
    // Find and return the transaction with the specified payment code
    return await Transaction.findOne({
      where: { transaction_result: paymentCode }, // Condition to match the payment code
    });
  }

  // The 'failed' method updates the transaction status to indicate a failure
  async failed(transactionId: number) {
    try {
      // Update the transaction type to 2 (e.g., 2 for failed)
      await Transaction.update(
        { type: 2 }, // New transaction type indicating failure
        { where: { id: transactionId } } // Condition to match the transaction ID
      );
    } catch (err) {
      // Log an error if updating the transaction status fails
      console.log(err);
    }
  }

  // The 'success' method updates the transaction status to indicate success
  async success(transactionId: number) {
    try {
      // Update the transaction type to 3 (e.g., 3 for successful)
      await Transaction.update(
        { type: 3 }, // New transaction type indicating success
        { where: { id: transactionId } } // Condition to match the transaction ID
      );
    } catch (err) {
      // Log an error if updating the transaction status fails
      console.log(err);
    }
  }
}
