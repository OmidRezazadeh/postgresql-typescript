import { Request, Response, NextFunction } from "express";
import { UserService } from "../../Services/UserService";
import { RoleService } from "../../Services/RoleService";
import { UserRepository } from "../../Repositories/UserRepository";
import { RoleRepository } from "../../Repositories/RoleRepository";
import { UserResource } from "../../transFormedData/UserResource/UserResource";
import {UserCollection} from "../../transFormedData/UserResource/UserCollection";

class userController {
  private userService: UserService;
  private roleService: RoleService;
  constructor(userService: UserService, roleService: RoleService) {
    this.userService = userService;
    this.roleService = roleService;
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      let userData;
      if (id) {
       const  user =  await this.userService.findById(id);

       userData = UserResource(user);
      }else{
        const data = req.body;
        const users= await this.userService.list(data);
        userData = UserCollection(users);
      }


      return res.status(200).json({ user: userData });
    } catch (error) {

      console.log(error);
    }
  }
}

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userService = new UserService(userRepository);
const roleService = new RoleService(roleRepository);
const UserController = new userController(userService, roleService);
export { UserController };
