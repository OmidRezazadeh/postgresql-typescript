import { Request, Response, NextFunction } from "express";
import { UserService } from "../../Services/UserService";
import { RoleService } from "../../Services/RoleService";
import { UserRepository } from "../../Repositories/UserRepository";
import { RoleRepository } from "../../Repositories/RoleRepository";
import { UserResource } from "../../transFormedData/UserResource/UserResource";
import { UserCollection } from "../../transFormedData/UserResource/UserCollection";

// userController class handles incoming requests related to user management.
class userController {
  // Instances of UserService and RoleService to handle business logic related to users and roles.
  private userService: UserService;
  private roleService: RoleService;

  // Constructor injects the UserService and RoleService dependencies.
  constructor(userService: UserService, roleService: RoleService) {
    this.userService = userService;
    this.roleService = roleService;
  }

  // list method handles requests to list users or retrieve a specific user by ID.
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10); // Parse the user ID from the request parameters.
      let userData;

      if (id) {
        // If an ID is provided, find the specific user using the userService.
        const user = await this.userService.findById(id);

        // Transform the user data using the UserResource function.
        userData = UserResource(user);
      } else {
        // If no ID is provided, retrieve a list of users.
        const data = req.body; // Extract any filtering data from the request body.
        const users = await this.userService.list(data);

        // Transform the list of users using the UserCollection function.
        userData = UserCollection(users);
      }

      // Send the transformed user data as a JSON response.
      return res.status(200).json({ "data": userData });
    } catch (error) {
      // Log any errors and pass them to the error handling middleware.
      console.log(error);
      next(error);
    }
  }
}

// Instantiate the necessary repositories for users and roles.
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

// Instantiate the services with their corresponding repositories.
const userService = new UserService(userRepository);
const roleService = new RoleService(roleRepository);

// Instantiate the userController with the necessary services.
const UserController = new userController(userService, roleService);

// Export the UserController instance for use in routing.
export { UserController };
