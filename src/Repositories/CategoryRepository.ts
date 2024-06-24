import { CategoryInterface } from "../interfaces/CategoryInterface";
import Category from "../models/category";
export class CategoryRepository implements CategoryInterface {
  async store(data: any) {
    return await Category.create(data);
  }

  async findByName(name: any) {
    return await Category.findOne({ where: { name: name } });
  }

  async findById(id: number) {
    return await Category.findByPk(id);
  }
  async edit(data: any, id: number) {
    return await Category.update(data, { where: { id: id } });
  }
}
