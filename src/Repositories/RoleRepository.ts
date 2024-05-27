import { ProfileInterface } from "../interfaces/RoleInterface";
import Role from "../models/role";
export class RoleRepository implements ProfileInterface {
  async create(data: any) {
    try {
      const role = await Role.create(data);
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number) {
    const role = await Role.findByPk(id);
    return role;
  }
  async edit(data: any, id: number) {
    const role = await Role.update(data, { where: { id: id } });
    console.log(role);
  }
}
