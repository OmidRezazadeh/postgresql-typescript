import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../../Services/CategoryService";
import {CategoryResource} from "../../transFormedData/CategoryResource/CategoryResource";
import{CategoryRepository} from "../../Repositories/CategoryRepository";
class categoryController {
  private categoryService: CategoryService;
  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const  data = req.body;

        await this.categoryService.storeValidate(data);
        const category= await this.categoryService.store(data);
        const categoryData= CategoryResource(category);
        res.status(200).json({"data":categoryData});
    } catch (error) {
      next(error);
        }
  };
}

const categoryRepository =new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const CategoryController = new categoryController(categoryService);
export {CategoryController}

