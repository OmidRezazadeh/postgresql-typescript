import { RoleRepository } from "../Repositories/RoleRepository"; // Importing the RoleRepository class
import { roleValidate } from "../validations/RoleValidate"; // Importing the validation schema for role
import { throwCustomError } from "../utils/errorHandling";
export class RoleService {
  private roleRepository: RoleRepository;

  // Constructor initializes the RoleRepository instance
  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  // Method to validate the role data using the validation schema
  async storeValidate(data: any) {
    const { error } = roleValidate.validate(data); // Validating the data
    if (error) {
      throwCustomError(error.details[0].message,400)
    
    }
  }
  async editValidate(data: any, id: number) {
    if (id !== undefined) {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        throwCustomError("نقشی یافت نشد",404);
      }
    }
    const { error } = roleValidate.validate(data); // Validating the data
    if (error) {
      throwCustomError(error.details[0].message,400);
    }
  }

  // Method to store the role data using the RoleRepository
  async store(data: any) {
    const role = await this.roleRepository.create(data); // Creating a new role in the repository
    return role; // Returning the created role
  }

  async edit(data: any, id: number) {
    const role = await this.roleRepository.edit(data, id);
    return role;
  }
  async find(id: number) {

        const role = await this.roleRepository.findById(id);
        if (!role) {
          throwCustomError("نقشی یافت نشد",404);
        } else {
            return role;
        }
    
}

async list(data:any){
return await this.roleRepository.list(data);
}

}
