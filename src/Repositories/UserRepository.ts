import {UserInterface} from "../interfaces/UserInterface";
import User from "../models/user";
import UserRole from "../models/userRole";
export class UserRepository implements UserInterface{

    async findById(userId:number){
           return await User.findByPk(userId);
    }
   async assignRole(data:any){
          return await UserRole.create(data);

    }
}

