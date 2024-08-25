import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../../Services/CategoryService";
import { CategoryResource } from "../../transFormedData/CategoryResource/CategoryResource";
import { CategoryRepository } from "../../Repositories/CategoryRepository";

// categoryController class handles incoming requests related to categories.
class categoryController {
  // Instance of CategoryService to handle business logic related to categories.
  private categoryService: CategoryService;

  // Constructor injects the CategoryService dependency.
  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  // store method handles requests to create a new category.
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body; // Extract the category data from the request body.

      // Validate the category data before storing it.
      await this.categoryService.storeValidate(data);

      // Store the new category data.
      const category = await this.categoryService.store(data);

      // Transform the stored category data using the CategoryResource function.
      const categoryData = CategoryResource(category);

      // Send the transformed category data as a JSON response.
      res.status(200).json({ data: categoryData });
    } catch (error) {
      // Pass any errors to the error handling middleware.
      next(error);
    }
  }

  // edit method handles requests to update an existing category.
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10); // Parse the category ID from the request parameters.
      const data = req.body; // Extract the updated category data from the request body.

      // Validate the updated category data and ID before editing.
      await this.categoryService.editValidate(data, id);

      // Update the category with the provided data.
      await this.categoryService.edit(data, id);

      // Send a success message as a JSON response.
      res.status(200).json({ "message": "بروز رسانی  با موفقیت انجام شد" }); // "Update successful" in Persian.
    } catch (error) {
      // Pass any errors to the error handling middleware.
      next(error);
    }
  }
}

// Instantiate the CategoryRepository to be used by the CategoryService.
const categoryRepository = new CategoryRepository();

// Instantiate CategoryService with its required repository.
const categoryService = new CategoryService(categoryRepository);

// Instantiate the categoryController with the necessary service.
const CategoryController = new categoryController(categoryService);

// Export the CategoryController instance for use in routing.
export { CategoryController };
