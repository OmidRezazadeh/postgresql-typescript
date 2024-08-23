import { Request, Response, NextFunction } from "express";
import { TransactionRepository } from "../Repositories/TransactionRepository";
import { TransactionService } from "../Services/TransactionService";
import { CartRepository } from "../Repositories/CartRepository";
import { CartService } from "../Services/CartService";
import { ProductRepository } from "../Repositories/ProductRepository";
import { CartItemRepository } from "../Repositories/CartItemRepository";
import { getDecodedToken } from "../utils/token";
class transactionController {
  private transactionService: TransactionService;
  private cartService: CartService;

  constructor(
    transactionService: TransactionService,
    cartService: CartService
  ) {
    this.cartService = cartService;
    this.transactionService = transactionService;
  }
  async pay(req: Request, res: Response, next: NextFunction) {
    const cartId = parseInt(req.params.id, 10);

    try {
      const cart = await this.cartService.find(cartId);

      const token = getDecodedToken(req.get("Authorization"));

      const userId = token.user.userId;
      const response = await this.transactionService.pay(cart);
      await this.transactionService.store(userId, response, cart);
      res.status(200).json(response.paymentUrl);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    const paymentCode = req.query.trackId;
    const paymentStatus = req.query.status;
    const transaction = await this.transactionService.processTransaction(paymentCode,paymentStatus);
    res.status(200).json({"message":transaction});
  }
}

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const productRepository = new ProductRepository();
const cartRepository = new CartRepository();
const cartItemRepository = new CartItemRepository();
const cartService = new CartService(
  productRepository,
  cartRepository,
  cartItemRepository
);
const TransactionController = new transactionController(
  transactionService,
  cartService
);
export { TransactionController };
