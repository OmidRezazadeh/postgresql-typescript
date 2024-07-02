import { ImageInterface } from "../interfaces/ImageInterface";
import Image from "../models/image";
import Profile from "../models/profile";
export class ImageRepository implements ImageInterface {
  async create(name: string, profileId: number) {
    return await Image.create(
      {
        url: name,
        imageable_id: profileId,
        imageable_type: "profile",
      },
    );
  }
}
