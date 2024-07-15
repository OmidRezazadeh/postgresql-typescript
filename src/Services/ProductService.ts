import { storeProductValidate } from "../validations/ProductValidate";
import { throwCustomError } from "../utils/errorHandling";
import { ProductRepository } from "../Repositories/ProductRepository";
import { ImageRepository } from "../Repositories/ImageRepository";
import { destinationFolderProduct, tempImage } from "../config/configPath";
import fs from "fs";
import path from "path";
export class ProductService {
  private imageRepository: ImageRepository;
  private productRepository: ProductRepository;
  constructor(
    imageRepository: ImageRepository,
    productRepository: ProductRepository
  ) {
    this.productRepository = productRepository;
    this.imageRepository = imageRepository;
  }

  async moveProductImage(imageArray: any, productId: number) {
    const destinationFolderPath = path.join(destinationFolderProduct, productId.toString());
  
    if (!fs.existsSync(destinationFolderPath)) {
      fs.mkdirSync(destinationFolderPath, { recursive: true });
    }
  
    for (const image of imageArray) {
      const tempImagePath = path.join(tempImage, image);
      const destinationImagePath = path.join(destinationFolderPath, image);
        fs.rename(tempImagePath, destinationImagePath, (err) => {
          if (err) {
            console.error(`Error moving ${tempImagePath} to ${destinationImagePath}:`, err);
          } else {
          }
        });
      await this.imageRepository.createProductImage(image, productId);
    }
}

  async storeValidate(data: any) {
    const imageArray = data.images;

    if (imageArray.length > 4) {
      throwCustomError("تعداد عکس نباید بیشتر از ۴ باشد", 400);
    }

    imageArray.forEach((image: any) => {
      const tempImagePath = path.join(tempImage, image);
      if (!fs.existsSync(tempImagePath)) {
        throwCustomError("عکسی یافت نشد", 400);
      }
    });
    const duplicates = imageArray.filter(
      (item: any, index: any) => imageArray.indexOf(item) !== index
    );
    if (duplicates.length >= 1) {
      throwCustomError("عکس نباید  تکراری باشد", 400);
    }

    const { error } = await storeProductValidate.validate(data);
    if (error) {
      throwCustomError(error.details[0].message, 400);
    }
  }

  async store(data: any, userId: number) {
    return await this.productRepository.store(data, userId);
  }
}
