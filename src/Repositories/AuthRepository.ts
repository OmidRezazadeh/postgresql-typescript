import { AuthIfterface } from "../interfaces/AuthInterface";
import User from "../models/user";
export class AuthRepository implements AuthIfterface {
  async authenticate(): Promise<any> {}
  async findbyEmail(email: string): Promise<any> {
    const user = await User.findOne({ where: { email: email } });
    return user;
  }
  async createUser(email: string, name: string, password: string) {
    const user = await User.create({
      email: email,
      name: name,
      password: password,
    });
    return user;
  }
}
