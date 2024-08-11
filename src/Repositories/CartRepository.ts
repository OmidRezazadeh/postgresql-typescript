import { CartInterface } from "../interfaces/CartInterface";
import Cart from "../models/cart";

export class CartRepository implements CartInterface {
  async store(userId: number, cartItems: any, transaction: any) {
    console.log("Attempting to create Cart with userId:", userId, "and cartItems:", cartItems);

    const cart = await Cart.create(
        {
            user_id: userId,
            address: cartItems.address,
            amount: cartItems.total_sum,
            status:0
        },
        { transaction }
    );

    console.log("Cart created:", cart);

    return cart;
}

}
