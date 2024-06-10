import { Request, Response, NextFunction } from "express";
import { ProfileService } from "../Services/ProfileService";
import {getDecodedToken} from "../utils/token";
import {ProfileRepository} from "../Repositories/ProfileRepository"
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
      const data= req.body;
      await this.profileService.editValidate(userId, authUserId,data);
      await this.profileService.edit(data,userId);
      res.status(201).json({"success":" بروز رسانی با موفقیت  انجام شد "});

    }catch(error){

      next(error);
    }
  };
}

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);
const ProfileController = new profileController(profileService);

export {ProfileController}
