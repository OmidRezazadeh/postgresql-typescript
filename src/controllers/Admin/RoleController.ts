import { Request, Response, NextFunction } from "express";
import { RoleService } from "../../Services/RoleService";
import { RoleRepository } from "../../Repositories/RoleRepository";
import { RoleResource } from "../../transFormedData/RoleResource/RoleResource";
import { RoleCollection } from "../../transFormedData/RoleResource/RoleCollection";

class roleController {
  private roleService: RoleService;
  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extracting data from the request body
      const data = req.body;
      
      // Validating the data using the storeValidate method from roleService
      await this.roleService.storeValidate(data);
      
      // Storing the role data using the store method from roleService
      const role = await this.roleService.store(data);
      
      // Sending a response with a 201 status code and the stored role data
      res.status(201).json({ role: role });
    } catch (err) {
      // Passing any errors to the next middleware (error handler)
      next(err);
    }
  };
  
  edit = async (req: Request, res: Response, next: NextFunction) => {
    // Parsing the ID from the request parameters
    const id = parseInt(req.params.id, 10);
    try {
      // Extracting data from the request body
      const data = req.body;
      
      // Validating the data and the ID using the editValidate method from roleService
      await this.roleService.editValidate(data, id);
      
      // Updating the role data using the edit method from roleService
      await this.roleService.edit(data, id);
      
      // Sending a response with a 201 status code and a success message
      res.status(201).json({ message: " نقش با موفقیت بروز رسانی شد" });
    } catch (err) {
      // Passing any errors to the next middleware (error handler)
      next(err);
    }
  };
  
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parsing the ID from the request parameters
      const id = parseInt(req.params.id, 10);
      if (id) {
        // If an ID is provided, find the specific role using the find method from roleService
        const role = await this.roleService.find(id);
        if (role) {
          // Transform the role data using the RoleResource function and send it in the response
          const roleData = RoleResource(role);
          return res.status(200).json({ role: roleData });
        }
      }
      
      // If no ID is provided, list all roles based on the request body data
      const data = req.body;
      const roles = await this.roleService.list(data);
      
      // Transform the list of roles using the RoleCollection function and send it in the response
      const roleData = RoleCollection(roles);
      res.status(200).json(roleData);
    } catch (error) {
      // Passing any errors to the next middleware (error handler)
      next(error);
    }
  };
  
}
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const RoleController = new roleController(roleService);
export {RoleController};
