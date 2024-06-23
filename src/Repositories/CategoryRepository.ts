import { CategoryInterface } from "../interfaces/CategoryInterface";
import Category from "../models/category";
export class CategoryRepository implements CategoryInterface {
  async store(data: any) {
    return await Category.create(data);
  }
}
