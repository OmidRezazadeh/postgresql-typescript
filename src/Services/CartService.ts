import { throwCustomError } from "../utils/errorHandling";
import { ProductRepository } from "../Repositories/ProductRepository";
import { CartRepository } from "../Repositories/CartRepository";
import { CartItemRepository } from "../Repositories/CartItemRepository";
export class CartService {
  private productRepository: ProductRepository;
  private cartRepository: CartRepository;
  private cartItemRepository: CartItemRepository;
  constructor(
    productRepository: ProductRepository,
    cartRepository: CartRepository,
    cartItemRepository: CartItemRepository
  ) {
    this.productRepository = productRepository;
    this.cartRepository = cartRepository;
    this.cartItemRepository = cartItemRepository;
  }
  async storeValidate(data: any) {
    // Extract cart items from the data object
    const cartItems = data.cart_items;

    // Check if the cart is empty
    if (cartItems.length == 0) {
      // Throw a custom error if the cart is empty
      throwCustomError("سبد خرید نباید خالی باشد", 400);
    }

    // Check if the address is provided
    if (!data.address) {
      // Throw a custom error if the address is missing
      throwCustomError(" ادرس اجباریست", 400);
    }

    // Check if the address is a string
    if (typeof data.address !== "string") {
      // Throw a custom error if the address is not a string
      throwCustomError("  ادرس   باید از نوع رشته باشد", 400);
    }

    // Loop through each cart item to perform validation
    for (const cartItem of cartItems) {
      // Check if the product ID is provided
      if (!cartItem.product_id) {
        // Throw a custom error if the product ID is missing
        throwCustomError(" ایدی محصول اجباریست", 400);
      }

      // Check if the product ID is a number
      if (typeof cartItem.product_id !== "number") {
        // Throw a custom error if the product ID is not a number
        throwCustomError(" ایدی  باید از نوع عددی باشد", 400);
      }

      // Fetch the product details from the repository using the product ID
      const product = await this.productRepository.findById(
        cartItem.product_id
      );

      // Check if the product exists
      if (!product) {
        // Throw a custom error if the product is not found
        throwCustomError("محصولی یافت نشد", 400);
      } else {
        // Check if the product is out of stock or if the requested quantity exceeds available stock
        if (
          product.count == 0 || // Product is out of stock
          cartItem.quantity >= product.count || // Requested quantity exceeds available stock
          product.status == 0 // Product is inactive
        ) {
          // Throw a custom error if the product is not available
          throwCustomError("محصولی موجود نیست ", 400);
        }
      }
    }
  }
  async getProductAmount(data: any) {
    const cartItems = data.cart_items;
    let totalSum = 0;
    for (const item of cartItems) {
      const product = await this.productRepository.findById(item.product_id);
      const productPrice = product?.price || 0;
      item.total_price = productPrice * item.quantity;
      totalSum += item.total_price;
    }
    cartItems.total_sum = totalSum;
    cartItems.address = data.address;
    return cartItems;
  }

  async store(data: any, userId: number, transaction: any) {
    
    const cartItemData = await this.getProductAmount(data);
    const cart = await this.cartRepository.store(
      userId,
      cartItemData,
      transaction
    );

    const cartItem = await this.cartItemRepository.store(
      cart.id,
      transaction,
      cartItemData
    );
    return cart;
  }
}
