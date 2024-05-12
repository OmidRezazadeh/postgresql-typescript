import { AuthIfterface } from "../interfaces/AuthInterface";
import User from "../models/user";
export class AuthRepository implements AuthIfterface {
  async authenticate(): Promise<any> {}
  async findbyEmail(email: string): Promise<any>{
    const user = await User.findOne({ where: { email: email } });
    return user;
  }
}
