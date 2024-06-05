import { UserRepository } from "../Repositories/UserRepository";
import {userRoleValidate} from "../validations/AssignUserRoleValidate"
export class UserService {
  private userRepository: UserRepository;
  
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  
   async validate(data:any){


    const { error } = userRoleValidate.validate(data); // Validating the data
    if (error) {
      // If validation fails
      const validationError = new Error(error.details[0].message); // Create a new error with the validation message
      (validationError as any).status = 400; // Set the status property of the error to 400 (Bad Request)
      throw validationError; // Throw the validation error
    }
  }

  
  async findById(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      const errorExitsUser = new Error("کاربری  یافت نشد");
      (errorExitsUser as any).status = 404;
      throw errorExitsUser;
    }
    return user;
  }

  async assign(userId:number, transaction:any){
   return await this.userRepository.assignRole(userId, transaction);
  }

}
