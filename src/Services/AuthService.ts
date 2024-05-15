import { AuthRepository } from "../Repositories/AuthRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class AuthService {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async findbyEmail(email: string) {
    try {
      const user = await this.authRepository.findbyEmail(email);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async registerUser(email: string, name: string) {
    try {
      const password = await bcrypt.hash("password", 10);
      const user = await this.authRepository.createUser(email, name, password);
      if(user){
      return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
   generateToken(userId: number, name: string, email: string) {
   
    const token = jwt.sign(
      { user: { userId: userId, email:email, name:name } },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );
    return token;
  }
}
