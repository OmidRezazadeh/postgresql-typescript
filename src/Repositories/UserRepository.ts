import { UserInterface } from "../interfaces/UserInterface";
import User from "../models/user";
import UserRole from "../models/userRole";
import Role from "../models/role"
export class UserRepository implements UserInterface {
  async findById(userId: number) {
    return await User.findByPk(userId);
  }
  async assignRole(userId: number, transaction: any) {
    return await UserRole.create(
      {
        user_id: userId,
        role_id: Role.ROLE_CLINT_ID,
      },
      {transaction}
    );
  }
}
