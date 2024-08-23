import { CartItemInterface } from "../interfaces/CartItemInterface";

import CartItem from "../models/cartItem";
export class CartItemRepository implements CartItemInterface {
  async store(cartId: number, transaction: any, cartItemsData: any) {
    try {

      for (const cartItem of cartItemsData) {
             await CartItem.create(
          {
            cart_id: cartId,
            product_id: cartItem.product_id,
            amount:   isNaN(cartItem.total_price) ? 0 : cartItem.total_price,
            quantity: cartItem.quantity,
          },
        
          { transaction}
        );
      }

    } catch (err) {
      console.log(err);
    }
  }
}
