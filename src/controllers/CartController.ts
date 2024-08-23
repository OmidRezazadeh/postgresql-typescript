import { Request, Response, NextFunction } from "express";
import { CartService } from "../Services/CartService";
import { CartRepository } from "../Repositories/CartRepository";
import { ProductRepository } from "../Repositories/ProductRepository";
import { CartItemRepository } from "../Repositories/CartItemRepository";
import { getDecodedToken } from "../utils/token";
const { connectDB } = require("../config/database");
class cartController {
  private cartService: CartService;
  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  async store(req: Request, res: Response, next: NextFunction) {
    let transaction;
    try {
        // Extract data from the request body
        const data = req.body;

        // Validate the provided data using the cart service
        await this.cartService.storeValidate(data);

        // Extract the authorization token from the request header and decode it
        const token = getDecodedToken(req.get("Authorization"));

        // Retrieve the user ID from the decoded token
        const userId = token.user.userId;

        // Initialize the Sequelize connection
        const sequelize = connectDB;

        // Start a new transaction
        transaction = await sequelize.transaction();

        // Store the cart data with the associated user ID and transaction
        const cart = await this.cartService.store(data, userId, transaction);

        // Commit the transaction to save changes to the database
        await transaction.commit();
        // Send a successful response with the stored cart data
        res.status(200).json({ data: cart });
    } catch (err) {
        // Rollback the transaction if there's an error to prevent partial changes
        if (transaction) await transaction.rollback();
        
        // Log the error to the console
        console.log(err);
        
        // Pass the error to the next middleware or error handler
        next(err);
    }
}

}
const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const cartItemRepository = new CartItemRepository();
const cartService = new CartService(
  productRepository,
  cartRepository,
  cartItemRepository
);
const CartController = new cartController(cartService);
export { CartController };
