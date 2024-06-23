import { storeValidate } from "../validations/CategoryValidate";
import { throwCustomError } from "../utils/errorHandling";
import { CategoryRepository } from "../Repositories/CategoryRepository";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async storeValidate(data: any) {
    const { error } = await storeValidate.validate(data);
    if (error) {
      throwCustomError(error.details[0].message, 400);
    }
  }

  async store(data: any) {
    return await this.categoryRepository.store(data);
  }
}
