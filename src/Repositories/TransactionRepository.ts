import { TransactionInterface } from "../interfaces/TransactionInterface";
import Cart from "../models/cart";
import Transaction from "../models/transaction";
import CartItem from "../models/cartItem";
import Product from "../models/product";
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
  async failed(transactionId: number, transaction: any) {
    try {
      await Transaction.update(
        { type: 2 },
        { where: { id: transactionId } },

      );
    } catch (err) {
      console.log(err);
    }
  }

  async success(transactionId: number, transaction: any) {
    try {

      await Transaction.update({ type: 3 },
        {
          where: { id: transactionId },
          transaction // add the transaction inside the options object
        });

      const transactionModel = await Transaction.findOne({
        where: { id: transactionId },
        include: [
          {
            model: Cart,
            as: "Cart",
            include: [
              {
                model: CartItem,
                as: "CartItem",
                include: [
                  {
                    model: Product,
                    as: "product"  // Use the correct alias here
                  }
                ]
              }
            ]
          }
        ]
      }) as Transaction & {
        Cart: Cart & {
          CartItem: Array<CartItem & { product: Product }>
        }
      };



      if (transactionModel && transactionModel.Cart) {
        const cartItems = transactionModel.Cart.CartItem;
        cartItems.forEach(cartItem => {
          console.log(cartItem.product); // Access each associated Product here
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
