import { Request, Response, NextFunction } from "express";
import { ProfileService } from "../Services/ProfileService";
import { getDecodedToken } from "../utils/token";
import { ProfileRepository } from "../Repositories/ProfileRepository";
import { ImageRepository } from "../Repositories/ImageRepository";
import { ImageResource } from "../transFormedData/ImageResource/ImageResource";
class profileController {
  private profileService: ProfileService;

  constructor(profileService: ProfileService) {
    this.profileService = profileService;
  }

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const token = getDecodedToken(req.get("Authorization"));
      const authUserId = token.user.userId;
      const data = req.body;
      await this.profileService.editValidate(userId, authUserId, data);
      await this.profileService.edit(data, userId);
      res.status(201).json({ success: "بروز رسانی با موفقیت  انجام شد" });
    } catch (error) {
      next(error);
    }
  };

  storeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageName = req.body.image_name;
      await this.profileService.validateImage(imageName);
      const token = getDecodedToken(req.get("Authorization"));
      const userId = token.user.userId;
      const profile = await this.profileService.findImageByUserId(userId);
      const image = await this.profileService.moveImage(
        imageName,
        userId,
        profile
      );

      const data = ImageResource(image);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = getDecodedToken(req.get("Authorization"));
    const authUserId = token.user.userId;
   const profile= await this.profileService.findImageByUserId(authUserId);
   await this.profileService.deleteImage(profile,authUserId);
   res.status(200).json("عکس  پروفایل حذف شد");


  };
}

const profileRepository = new ProfileRepository();
const imageRepository = new ImageRepository();
const profileService = new ProfileService(profileRepository, imageRepository);
const ProfileController = new profileController(profileService);

export { ProfileController };
