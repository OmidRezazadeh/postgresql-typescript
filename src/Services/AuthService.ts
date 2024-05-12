import { AuthRepository } from "../Repositories/AuthRepository";

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
}
