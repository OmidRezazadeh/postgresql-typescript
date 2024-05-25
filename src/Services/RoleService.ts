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
    console.log(data.name); // Logging the name of the role (for debugging purposes)
    const { error } = roleValidate.validate(data); // Validating the data
    if (error) { // If validation fails
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
}
