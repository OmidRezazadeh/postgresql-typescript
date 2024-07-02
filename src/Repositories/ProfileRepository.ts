import { ProfileInterface } from "../interfaces/ProfileInterface";
import Profile from "../models/profile";
import Image from "../models/image";
export class ProfileRepository implements ProfileInterface {
  async create(userId: number, transaction: any): Promise<any> {
    try {
      const profile = await Profile.create(
        {
          user_id: userId,
        },
        { transaction }
      );
      return profile;
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  }
  async findByUserId(userId: number) {
    try {
      return await Profile.findOne({where: {user_id: userId}});
    } catch (error) {
      console.log(error);
    }
  }

  async findImageByUserId(userId: number){
    const profile = await Profile.findOne({
      where: { user_id: userId },
      include: [
        { model: Image, as: 'image'}
      ]
    });
    return profile;

  }
  async edit(data: any, userId: number): Promise<any> {
    try {
      await Profile.update(data, { where: { user_id: userId } });
    } catch (error) {
      console.log(error);
    }
  }
}
