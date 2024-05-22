import { ProfileInterface } from "../interfaces/ProfileInterface";
import Profile from "../models/profile";
export class ProfileRepository implements ProfileInterface {
  async create(userId: number, transaction:any): Promise<any> {

    try {
      const profile = await Profile.create({
        user_id: userId,
      },
    {transaction}
    );
      return profile;
    } catch (error) {
      console.error('Error creating profile:', error);
     
    }
  }
}
