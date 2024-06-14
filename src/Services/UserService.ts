import { UserRepository } from "../Repositories/UserRepository";
import {userRoleValidate} from "../validations/AssignUserRoleValidate"
import { throwCustomError } from "../utils/errorHandling";
export class UserService {
  private userRepository: UserRepository;
  
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  
   async validate(data:any){


    const { error } = userRoleValidate.validate(data); // Validating the data
    if (error) {
      throwCustomError(error.details[0].message,400);
    }
  }

  
  async findById(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throwCustomError("کاربری  یافت نشد",404);
    }
    return user;
  }

  async assign(userId:number, transaction:any){
   return await this.userRepository.assignRole(userId, transaction);
  }

}
