import { ProfileRepository } from "../Repositories/ProfileRepository";
import { editValidate } from "../validations/ProfileValidate";
import { throwCustomError } from "../utils/errorHandling";

export class ProfileService {
  private profileRepository: ProfileRepository;
  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }
  async create(userId: number, transaction: any) {
    try {
      const profile = await this.profileRepository.create(userId, transaction);
      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  async editValidate(userId: number, authUserId: number, data: any) {

    if (userId !== authUserId) {
      throwCustomError("شما اجازه  بروز رسانی این پروفایل را ندارید",400);
    }
   const profile = await this.profileRepository.findByUserId(userId);
   if(!profile){
    throwCustomError("پروفایلی یافت نشد",404);
   }
    const { error } = await editValidate.validate(data);
    if (error) {
      throwCustomError(error.details[0].message,400);
    }
  }
  async edit(data: any,userId:number) {
    await this.profileRepository.edit(data,userId);

  }
}
