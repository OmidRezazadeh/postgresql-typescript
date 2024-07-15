import { Op } from "sequelize";
import { ImageInterface } from "../interfaces/ImageInterface";
import Image from "../models/image";

import { throwCustomError } from "../utils/errorHandling";
export class ImageRepository implements ImageInterface {
  async create(name: string, profileId: number) {
    const exitsImage = await Image.findOne({
      where: {
        [Op.and]: [{ imageable_id: profileId }, { imageable_type: "profile" }],
      },
    });
    if (exitsImage) {
      throwCustomError("مجدا عکس اپلود کنید ", 400);
    }

    return await Image.create({
      url: name,
      imageable_id: profileId,
      imageable_type: "profile",
    });
  }

  async update(imageName: string, profileId: number) {
    console.log(imageName);
    await Image.update(
      { url: imageName },
      { where: { imageable_id: profileId } }
    );

    const image = await Image.findOne({ where: { imageable_id: profileId } });
    return image;
  }

  async deleteImage(image: any) {
    await image.destroy();
  }

  async createProductImage(image:string, productId:number){
    return await Image.create({
      url: image,
      imageable_id: productId,
      imageable_type: "product",
    });
  }
}
