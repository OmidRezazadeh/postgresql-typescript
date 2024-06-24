import { storeValidate } from "../validations/CategoryValidate";
import { throwCustomError } from "../utils/errorHandling";
import { CategoryRepository } from "../Repositories/CategoryRepository";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async storeValidate(data: any) {
    const categoryName = await this.categoryRepository.findByName(data.name);
    if (categoryName) {
      throwCustomError(" این دسته  موجود است ", 400);
    }
    const { error } = await storeValidate.validate(data);
    if (error) {
      throwCustomError(error.details[0].message, 400);
    }
  }

  async store(data: any) {
    return await this.categoryRepository.store(data);
  }

  async editValidate(data: any, id: number) {
    const { error } = await storeValidate.validate(data);
    if (error) {
      throwCustomError(error.details[0].message, 400);
    }
    const categoryName = await this.categoryRepository.findByName(data.name);
    if (categoryName) {
      throwCustomError(" این دسته  موجود است ", 400);
    }
    const category = await this.categoryRepository.findById(id);
    console.log(category);
    if (!category) {
      throwCustomError("دسته ای یافت نشد", 404);
    }
  }
  async edit(data: any, id: number) {
    return await this.categoryRepository.edit(data, id);
  }
}
