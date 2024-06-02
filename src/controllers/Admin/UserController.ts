import { Request, Response, NextFunction } from "express";
import { UserService } from "../../Services/UserService";
import { RoleService } from "../../Services/RoleService";
import { UserRepository } from "../../Repositories/UserRepository";
import { RoleRepository } from "../../Repositories/RoleRepository";

class userController {
  private userService: UserService;
  private roleService: RoleService;
  constructor(userService: UserService, roleService: RoleService) {
    this.userService = userService;
    this.roleService = roleService;
  }
  async assignRole(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.userService.validate(data);
      await this.userService.findById(data.user_id);
      await this.roleService.find(data.role_id);
      const assignUserRole =await this.userService.assign(data);
      res.status(200).json(assignUserRole);
    } catch (error) {
      next(error);
    }
  }
}
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userService = new UserService(userRepository);
const roleService = new RoleService(roleRepository);
const UserController = new userController(userService, roleService);
export { UserController };
