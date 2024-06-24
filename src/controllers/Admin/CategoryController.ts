import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../../Services/CategoryService";
import { CategoryResource } from "../../transFormedData/CategoryResource/CategoryResource";
import { CategoryRepository } from "../../Repositories/CategoryRepository";
class categoryController {
  private categoryService: CategoryService;
  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      await this.categoryService.storeValidate(data);
      const category = await this.categoryService.store(data);
      const categoryData = CategoryResource(category);
      res.status(200).json({ data: categoryData });
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const data = req.body;
      await this.categoryService.editValidate(data, id);
      await this.categoryService.edit(data, id);
      res.status(200).json({"message":"بروز رسانی  با موفقیت انجام شد"})
    } catch (error) {
      next(error);
    }
  }
}
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const CategoryController = new categoryController(categoryService);
export { CategoryController };
