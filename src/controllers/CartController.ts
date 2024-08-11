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
        const data = req.body;
        await this.cartService.storeValidate(data);
        const token = getDecodedToken(req.get("Authorization"));

        const userId = token.user.userId;
        const sequelize = connectDB;
        transaction = await sequelize.transaction();
        const cart = await this.cartService.store(data, userId, transaction);

        // Commit the transaction
        await transaction.commit();

        res.status(200).json({ data: cart });
    } catch (err) {
        // Rollback the transaction if there's an error
        if (transaction) await transaction.rollback();
        console.log(err);
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
