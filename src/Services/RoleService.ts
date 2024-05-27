import { RoleRepository } from "../Repositories/RoleRepository"; // Importing the RoleRepository class
import { roleValidate } from "../validations/RoleValidate"; // Importing the validation schema for role

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
      // If validation fails
      const validationError = new Error(error.details[0].message); // Create a new error with the validation message
      (validationError as any).status = 400; // Set the status property of the error to 400 (Bad Request)
      throw validationError; // Throw the validation error
    }
  }
  async editValidate(data: any, id: number) {
    if (id !== undefined) {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        const errorExitsRole = new Error("نقشی یافت نشد");
        (errorExitsRole as any).status = 404;
        throw errorExitsRole;
      }
    }
    const { error } = roleValidate.validate(data); // Validating the data
    if (error) {
      // If validation fails
      const validationError = new Error(error.details[0].message); // Create a new error with the validation message
      (validationError as any).status = 400; // Set the status property of the error to 400 (Bad Request)
      throw validationError; // Throw the validation error
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
            const errorExitsRole = new Error("نقشی یافت نشد");
            (errorExitsRole as any).status = 404;
            throw errorExitsRole;
        } else {
            return role;
        }
    
}

async list(data:any){
return await this.roleRepository.list(data);
}

}
