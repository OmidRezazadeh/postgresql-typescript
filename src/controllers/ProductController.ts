import { ProductService } from "../Services/ProductService";
import { Request, Response, NextFunction } from "express";
import { getDecodedToken } from "../utils/token";
import { ProductRepository } from "../Repositories/ProductRepository";
import { ImageRepository } from "../Repositories/ImageRepository";
import { ProductResource} from "../transFormedData/Product/ProductResource";
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

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id, 10);
      const data = req.body;
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.userId;
      await this.productService.editValidate(productId, data, userId);
      await this.productService.edit(productId, data);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      // Parsing the ID from the request parameters
      const id = parseInt(req.params.id, 10);
      if (id) {
        // If an ID is provided, find the specific product using the find method from productService
        const product = await this.productService.findById(id);
        if (product) {
          // Transform the role data using the ProductResource function and send it in the response
          const productData = ProductResource(product);
          return res.status(200).json({ product: productData });
        }else{
          return res.status(404).json({ });
        }

      }
      const data =req.body;
      const products = await this.productService.list(data);
      res.status(200).json(products)
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

const productRepository = new ProductRepository();
const imageRepository = new ImageRepository();
const productService = new ProductService(imageRepository, productRepository);
const ProductController = new productController(productService);
export { ProductController };
