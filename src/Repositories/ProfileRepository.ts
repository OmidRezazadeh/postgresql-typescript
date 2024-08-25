import { ProfileInterface } from "../interfaces/ProfileInterface";
import Profile from "../models/profile";
import Image from "../models/image";

// ProfileRepository class implements the ProfileInterface
export class ProfileRepository implements ProfileInterface {

  // The 'create' method adds a new profile record associated with a user
  async create(userId: number, transaction: any): Promise<any> {
    try {
      // Create a new profile with the provided user ID within a transaction
      const profile = await Profile.create(
        {
          user_id: userId, // ID of the user for whom the profile is created
        },
        { transaction } // Use the provided transaction for database operations
      );
      return profile; // Return the newly created profile
    } catch (error) {
      // Log an error if profile creation fails
      console.error("Error creating profile:", error);
    }
  }

  // The 'findByUserId' method retrieves a profile by its associated user ID
  async findByUserId(userId: number) {
    try {
      // Find and return the profile with the specified user ID
      return await Profile.findOne({ where: { user_id: userId } });
    } catch (error) {
      // Log an error if profile retrieval fails
      console.log(error);
    }
  }

  // The 'findImageByUserId' method retrieves the profile and its associated image by user ID
  async findImageByUserId(userId: number) {
    // Find the profile associated with the user ID and include the associated image
    const profile = await Profile.findOne({
      where: { user_id: userId }, // Condition to find the profile by user ID
      include: [
        { model: Image, as: 'image' } // Include the associated image model
      ]
    });
    return profile; // Return the profile with the associated image
  }

  // The 'edit' method updates the profile with new data for a specified user ID
  async edit(data: any, userId: number): Promise<any> {
    try {
      // Update the profile with new data where the user ID matches
      await Profile.update(data, { where: { user_id: userId } });
    } catch (error) {
      // Log an error if profile update fails
      console.log(error);
    }
  }
}
