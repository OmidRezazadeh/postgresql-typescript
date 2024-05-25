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
}
