import { Request, Response, NextFunction } from "express";
import { RoleService } from "../../Services/RoleService";
import { RoleRepository } from "../../Repositories/RoleRepository";
class roleController {
  private roleService: RoleService;
  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
        await this.roleService.storeValidate(data);
       const role=  await this.roleService.store(data);

       res.status(201).json({ role: role });
    } catch (err) {
      console.log(err);
        next(err);
      
    }
  };
}
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const RoleController = new roleController(roleService);

export { RoleController};
