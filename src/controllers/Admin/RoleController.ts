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
      const role = await this.roleService.store(data);
      res.status(201).json({ role: role });
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
      const data = req.body;
      await this.roleService.editValidate(data,id);
      const role = await this.roleService.edit(data,id);
      res.status(201).json({ "message": " نقش با موفقیت بروز رسانی شد" });
    } catch (err) {
      next(err);
    }
  };
}
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const RoleController = new roleController(roleService);

export { RoleController };
