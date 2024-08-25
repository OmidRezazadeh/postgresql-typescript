import { CartItemInterface } from "../interfaces/CartItemInterface";
import CartItem from "../models/cartItem";

// CartItemRepository class implements the CartItemInterface
export class CartItemRepository implements CartItemInterface {

  // The 'store' method saves cart items to the database
  async store(cartId: number, transaction: any, cartItemsData: any) {
    try {
      // Loop through each item in the cartItemsData array
      for (const cartItem of cartItemsData) {
        
        // Create a new cart item record in the database
        await CartItem.create(
          {
            cart_id: cartId, // The ID of the cart this item belongs to
            product_id: cartItem.product_id, // The ID of the product
            amount: isNaN(cartItem.total_price) ? 0 : cartItem.total_price, // The total price of the item, defaulting to 0 if not a number
            quantity: cartItem.quantity, // The quantity of the product
          },
          { transaction } // Use the provided transaction for database operations
        );
      }

    } catch (err) {
      // Log any errors that occur during the database operation
      console.log(err);
    }
  }
}
