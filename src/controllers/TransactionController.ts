import { Request, Response, NextFunction } from "express";
import { TransactionRepository } from "../Repositories/TransactionRepository";
import { TransactionService } from "../Services/TransactionService";
import { CartRepository } from "../Repositories/CartRepository";
import { CartService } from "../Services/CartService";
import { ProductRepository } from "../Repositories/ProductRepository";
import { CartItemRepository } from "../Repositories/CartItemRepository";
import { getDecodedToken } from "../utils/token";

// transactionController class handles incoming requests related to transactions.
class transactionController {
  // Instances of TransactionService and CartService to handle business logic.
  private transactionService: TransactionService;
  private cartService: CartService;

  // Constructor injects dependencies: TransactionService and CartService.
  constructor(
    transactionService: TransactionService,
    cartService: CartService
  ) {
    this.cartService = cartService;
    this.transactionService = transactionService;
  }

  // pay method handles payment initiation requests.
  async pay(req: Request, res: Response, next: NextFunction) {
    // Parse the cart ID from the request parameters.
    const cartId = parseInt(req.params.id, 10);

    try {
      // Find the cart details using the CartService.
      const cart = await this.cartService.find(cartId);

      // Extract the user ID from the decoded token in the Authorization header.
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.userId;

      // Initiate the payment process using TransactionService.
      const response = await this.transactionService.pay(cart);

      // Store the transaction details in the database.
      await this.transactionService.store(userId, response, cart);

      // Send the payment URL to the client as a JSON response.
      res.status(200).json(response.paymentUrl);
    } catch (error) {
      // Pass any errors to the error handling middleware.
      next(error);
      console.log(error);
    }
  }

  // verifyPayment method handles requests to verify the outcome of a payment.
  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    // Extract paymentCode and paymentStatus from the request query parameters.
    const paymentCode = req.query.trackId;
    const paymentStatus = req.query.status;

    // Process the transaction based on paymentCode and paymentStatus.
    const transaction = await this.transactionService.processTransaction(paymentCode, paymentStatus);

    // Send the transaction result message as a JSON response.
    res.status(200).json({ "message": transaction });
  }
}

// Instantiate repositories to be used by services.
const transactionRepository = new TransactionRepository();
const productRepository = new ProductRepository();
const cartRepository = new CartRepository();
const cartItemRepository = new CartItemRepository();

// Instantiate services with their required repositories.
const transactionService = new TransactionService(transactionRepository);
const cartService = new CartService(
  productRepository,
  cartRepository,
  cartItemRepository
);

// Instantiate the transactionController with the necessary services.
const TransactionController = new transactionController(
  transactionService,
  cartService
);

// Export the TransactionController instance for use in routing.
export { TransactionController };
