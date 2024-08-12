import { CartInterface } from "../interfaces/CartInterface";
import Cart from "../models/cart";

export class CartRepository implements CartInterface {
  async store(userId: number, cartItems: any, transaction: any) {
    const cart = await Cart.create(
      {
        user_id: userId,
        address: cartItems.address,
        amount: cartItems.total_sum,
        status: 0,
      },
      { transaction }
    );
    return cart;
  }

  async find(cartId: number) {
    return await Cart.findByPk(cartId);
  }
}
