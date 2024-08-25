import { ProductService } from "../Services/ProductService";
import { Request, Response, NextFunction } from "express";
import { getDecodedToken } from "../utils/token";
import { ProductRepository } from "../Repositories/ProductRepository";
import { ImageRepository } from "../Repositories/ImageRepository";
import { ProductResource } from "../transFormedData/Product/ProductResource";

// productController class handles incoming requests related to products.
class productController {
  // Instance of ProductService to handle business logic.
  private productService: ProductService;

  // Constructor injects the ProductService dependency.
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  // create method handles requests to create a new product.
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body; // Extract the data from the request body.

      // Validate the product data before storing it.
      await this.productService.storeValidate(data);

      // Extract the user ID from the decoded token in the Authorization header.
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.userId;

      // Store the new product data along with the user ID who created it.
      const product = await this.productService.store(data, userId);

      // Move the product images to the appropriate location.
      const imageArray = data.images;
      await this.productService.moveProductImage(imageArray, product.id);

      // Send the created product data as a JSON response.
      res.status(200).json(product);
    } catch (error) {
      // Pass any errors to the error handling middleware.
      next(error);
    }
  }

  // edit method handles requests to update an existing product.
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = parseInt(req.params.id, 10); // Parse the product ID from the request parameters.
      const data = req.body; // Extract the data from the request body.
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.userId;

      // Validate the product data and the user ID before editing.
      await this.productService.editValidate(productId, data, userId);

      // Edit the product with the provided data.
      await this.productService.edit(productId, data);

      // Send a success response.
      res.json({ success: true });
    } catch (error) {
      // Pass any errors to the error handling middleware.
      next(error);
    }
  }

  // list method handles requests to list all products or a specific product by ID.
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse the ID from the request parameters.
      const id = parseInt(req.params.id, 10);
      
      if (id) {
        // If an ID is provided, find the specific product using the findById method from productService.
        const product = await this.productService.findById(id);
        if (product) {
          // Transform the product data using the ProductResource function and send it in the response.
          const productData = ProductResource(product);
          return res.status(200).json({ product: productData });
        } else {
          // If the product is not found, send a 404 status with an empty response.
          return res.status(404).json({});
        }
      }

      // If no ID is provided, list all products based on the request body data.
      const data = req.body;
      const products = await this.productService.list(data);

      // Send the list of products as a JSON response.
      res.status(200).json(products);
    } catch (error) {
      // Pass any errors to the error handling middleware and log them.
      next(error);
      console.log(error);
    }
  }
}

// Instantiate repositories to be used by the ProductService.
const productRepository = new ProductRepository();
const imageRepository = new ImageRepository();

// Instantiate ProductService with its required repositories.
const productService = new ProductService(imageRepository, productRepository);

// Instantiate the productController with the necessary service.
const ProductController = new productController(productService);

// Export the ProductController instance for use in routing.
export { ProductController };
