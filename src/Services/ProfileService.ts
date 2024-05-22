import { ProfileRepository } from "../Repositories/ProfileRepository";

export class ProfileService {
  private profileRepository: ProfileRepository;
  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }
  async create(userId: number, transaction:any) {
    try {
      const profile = await this.profileRepository.create(userId, transaction);
      return profile;
    } catch (error) {
      console.log(error);
    }
  }
}
