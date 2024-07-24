import {
  storeProductValidate,
  editProductValidate,
} from "../validations/ProductValidate";
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
    const destinationFolderPath = path.join(
      destinationFolderProduct,
      productId.toString()
    );

    if (!fs.existsSync(destinationFolderPath)) {
      fs.mkdirSync(destinationFolderPath, { recursive: true });
    }

    for (const image of imageArray) {
      const tempImagePath = path.join(tempImage, image);
      const destinationImagePath = path.join(destinationFolderPath, image);
      fs.rename(tempImagePath, destinationImagePath, (err) => {
        if (err) {
          console.error(
            `Error moving ${tempImagePath} to ${destinationImagePath}:`,
            err
          );
        } else {
        }
      });
      await this.imageRepository.createProductImage(image, productId);
    }
  }

  async storeValidate(data: any) {
    const { error } = await storeProductValidate.validate(data);
    if (error) {
      throwCustomError(error.details[0].message, 400);
    }

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
  }

  async store(data: any, userId: number) {
    return await this.productRepository.store(data, userId);
  }

  async editValidate(productId: number, data: any, userId: number) {
    const { error } = await editProductValidate.validate(data);
    if (error) {
      throwCustomError(error.details[0].message, 400);
    }

    const product = await this.productRepository.findById(productId);
    if (!product) {
      throwCustomError("محصولی یافت نشد", 404);
    }

    const checkAccessUser = await this.productRepository.checkAccessUser(
      productId,
      userId
    );
    if (!checkAccessUser) {
      throwCustomError("شما اجازه دسترسی به این محصول را ندارید", 404);
    }

    const images = data.images;

    if (images !== undefined && Object.keys(images).length >= 1) {
      for (const image in images) {
        const imageName = images[image];

        const imagePath = path.join(tempImage, imageName);
        if (!fs.existsSync(imagePath)) {
          throwCustomError("عکسی یافت نشد", 404);
        }
      }
    }
  }

  async editProductImage(product: any, data: any) {
    const images = data.images;
    const imageIdes = [];
    for (const image in images) {
      const imageName = images[image];
      const exitsImage = this.imageRepository.findById(image);
      if (!exitsImage) {
        throwCustomError("عکسی یافت نشد", 404);
      }
      imageIdes.push(image);
    }

    const oldImages = await this.imageRepository.getImagesByIdes(imageIdes);
    oldImages.forEach((image: any) => {
      const destinationFolderPath = path.join(
        destinationFolderProduct,
        product.id.toString()
      );
      const destinationImagePath = path.join(destinationFolderPath, image.url);
      fs.unlink(destinationImagePath, (err) => {
        if (err) {
          console.error(`Error deleting original image ${image}:`, err);
        } else {
        }
      });
    });

    const newImages = data.images;

    for (const image in newImages) {
      const imageName = newImages[image];
      const destinationFolderPath = path.join(
        destinationFolderProduct,
        product.id.toString()
      );
      const destinationNewImagePath = path.join(
        destinationFolderPath,
        imageName
      );
      const tempImagePath = path.join(tempImage, imageName);
      fs.rename(tempImagePath, destinationNewImagePath, (err) => {
        if (err) {
          console.error(
            `Error moving ${tempImagePath} to ${destinationNewImagePath}:`,
            err
          );
        } else {
        }
      });
    }

    await this.imageRepository.editProduct(newImages);
  }
  async edit(productId: number, data: any) {
    if (data.images) {
      const product = await this.productRepository.findImageByProductId(
        productId
      );
      await this.editProductImage(product, data);
      if (!product) {
        throwCustomError("محصولی یافت نشد", 404);
      }
    }
    await this.productRepository.edit(productId, data);
  }
  async findById(id: number) {
    return await this.productRepository.findById(id);
    
  }
  async list(data:any){
    return await this.productRepository.list(data);
  }
}
