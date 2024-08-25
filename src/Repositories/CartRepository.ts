import { CartInterface } from "../interfaces/CartInterface";
import Cart from "../models/cart";

// CartRepository class implements the CartInterface
export class CartRepository implements CartInterface {

  // The 'store' method creates a new cart record in the database
  async store(userId: number, cartItems: any, transaction: any) {
    // Create a new cart with the provided user ID and cart details
    const cart = await Cart.create(
      {
        user_id: userId, // The ID of the user who owns the cart
        address: cartItems.address, // Delivery address for the cart
        amount: cartItems.total_sum, // Total amount of the cart
        status: 0, // Initial status of the cart (e.g., 0 for pending)
      },
      { transaction } // Use the provided transaction for database operations
    );
    
    // Return the newly created cart
    return cart;
  }

  // The 'find' method retrieves a cart by its ID
  async find(cartId: number) {
    // Find and return the cart with the specified ID
    return await Cart.findByPk(cartId);
  }
}
