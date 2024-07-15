import { ProductService } from "../Services/ProductService";
import { Request, Response, NextFunction } from "express";
import { getDecodedToken } from "../utils/token";
import { ProductRepository } from "../Repositories/ProductRepository";
import { ImageRepository } from "../Repositories/ImageRepository";
class productController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      await this.productService.storeValidate(data);
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.userId;
      const product = await this.productService.store(data, userId);
      const imageArray = data.images;
      await this.productService.moveProductImage(imageArray, product.id);
  

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}
const productRepository = new ProductRepository();
const imageRepository = new ImageRepository();
const productService = new ProductService(imageRepository, productRepository);
const ProductController = new productController(productService);
export { ProductController };
