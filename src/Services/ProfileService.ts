import { ProfileRepository } from "../Repositories/ProfileRepository";
import { editValidate } from "../validations/ProfileValidate";

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

console.log(userId,authUserId)
    if (userId !== authUserId) {
      const errorExitsUser = new Error(
        "شما اجازه  بروز رسانی این پروفایل را ندارید"
      );
      (errorExitsUser as any).status = 400;
      throw errorExitsUser;
    }
   const profile = await this.profileRepository.findByUserId(userId);
   if(!profile){
    const errorExitsUser = new Error(
      "پروفایلی یافت نشد"
    );
    (errorExitsUser as any).status = 400;
    throw errorExitsUser;
   }
    const { error } = await editValidate.validate(data);
    if (error) {
      // If validation fails
      const validationError = new Error(error.details[0].message); // Create a new error with the validation message
      (validationError as any).status = 400; // Set the status property of the error to 400 (Bad Request)
      throw validationError; // Throw the validation error
    }
  }
  async edit(data: any,userId:number) {
    await this.profileRepository.edit(data,userId);

  }
}
