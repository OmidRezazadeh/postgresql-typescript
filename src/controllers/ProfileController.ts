import { Request, Response, NextFunction } from "express";
import { ProfileService } from "../Services/ProfileService";
import { getDecodedToken } from "../utils/token";
import { ProfileRepository } from "../Repositories/ProfileRepository";
import { ImageRepository } from "../Repositories/ImageRepository";
import { ImageResource } from "../transFormedData/ImageResource/ImageResource";

// profileController class handles incoming requests related to user profiles.
class profileController {
  // Instance of ProfileService to handle business logic related to profiles.
  private profileService: ProfileService;

  // Constructor injects the ProfileService dependency.
  constructor(profileService: ProfileService) {
    this.profileService = profileService;
  }

  // edit method handles requests to update user profile information.
  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id, 10); // Parse the user ID from the request parameters.
      const token = getDecodedToken(req.get("Authorization")); // Extract the auth token from the request header.
      const authUserId = token.user.userId; // Extract the authenticated user ID from the token.
      const data = req.body; // Extract the data from the request body.

      // Validate the profile data and user ID before editing.
      await this.profileService.editValidate(userId, authUserId, data);

      // Update the user profile with the provided data.
      await this.profileService.edit(data, userId);

      // Send a success response.
      res.status(201).json({ success: "بروز رسانی با موفقیت  انجام شد" }); // "Update successful" in Persian.
    } catch (error) {
      // Pass any errors to the error handling middleware.
      next(error);
    }
  };

  // storeImage method handles requests to store a user's profile image.
  storeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageName = req.body.image_name; // Extract the image name from the request body.

      // Validate the provided image name.
      await this.profileService.validateImage(imageName);

      const token = getDecodedToken(req.get("Authorization")); // Extract the auth token from the request header.
      const userId = token.user.userId; // Extract the authenticated user ID from the token.

      // Find the user's current profile image.
      const profile = await this.profileService.findImageByUserId(userId);

      // Move the new image to the appropriate location and update the profile.
      const image = await this.profileService.moveImage(imageName, userId, profile);

      // Transform the image data using the ImageResource function and send it in the response.
      const data = ImageResource(image);
      res.status(200).json(data);
    } catch (error) {
      // Log any errors and pass them to the error handling middleware.
      console.log(error);
      next(error);
    }
  };

  // delete method handles requests to delete a user's profile image.
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = getDecodedToken(req.get("Authorization")); // Extract the auth token from the request header.
    const authUserId = token.user.userId; // Extract the authenticated user ID from the token.

    // Find the user's current profile image.
    const profile = await this.profileService.findImageByUserId(authUserId);

    // Delete the user's profile image.
    await this.profileService.deleteImage(profile, authUserId);

    // Send a success response indicating the profile image was deleted.
    res.status(200).json("عکس  پروفایل حذف شد"); // "Profile picture deleted" in Persian.
  };
}

// Instantiate repositories to be used by the ProfileService.
const profileRepository = new ProfileRepository();
const imageRepository = new ImageRepository();

// Instantiate ProfileService with its required repositories.
const profileService = new ProfileService(profileRepository, imageRepository);

// Instantiate the profileController with the necessary service.
const ProfileController = new profileController(profileService);

// Export the ProfileController instance for use in routing.
export { ProfileController };
