import { RoleRepository } from "../Repositories/RoleRepository";
import { roleValidate } from "../validations/RoleValidate";
export class RoleService {
  private roleRepository: RoleRepository;
  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async storeValidate(data: any) {
    const { error } = roleValidate.validate(data);
    if (error) {
      const validationError = new Error(error.details[0].message);
      (validationError as any).status = 400;
      throw validationError;
    }
  }

  async store(data: any) {
    const role = await this.roleRepository.create(data);

    return role;
  }
}
