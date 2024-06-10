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

}

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const userService = new UserService(userRepository);
const roleService = new RoleService(roleRepository);
const UserController = new userController(userService, roleService);
export { UserController };
