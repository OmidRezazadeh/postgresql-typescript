import { Op } from "sequelize";
import { ImageInterface } from "../interfaces/ImageInterface";
import Image from "../models/image";
import { throwCustomError } from "../utils/errorHandling";

// ImageRepository class implements the ImageInterface
export class ImageRepository implements ImageInterface {

  // The 'create' method adds a new image record for a profile
  async create(name: string, profileId: number) {
    // Check if an image already exists for the given profileId
    const existsImage = await Image.findOne({
      where: {
        [Op.and]: [
          { imageable_id: profileId }, // Profile ID associated with the image
          { imageable_type: "profile" } // Type of the imageable entity (profile)
        ],
      },
    });

    // If an image already exists, throw a custom error
    if (existsImage) {
      throwCustomError("مجدا عکس اپلود کنید ", 400); // Custom error message and status code
    }

    // Create and return a new image record
    return await Image.create({
      url: name, // URL of the image
      imageable_id: profileId, // Profile ID associated with the image
      imageable_type: "profile", // Type of the imageable entity (profile)
    });
  }

  // The 'update' method modifies the URL of an existing image for a profile
  async update(imageName: string, profileId: number) {
    // Update the image URL for the specified profile ID
    await Image.update(
      { url: imageName }, // New URL for the image
      { where: { imageable_id: profileId } } // Condition to match the image to update
    );

    // Retrieve and return the updated image record
    const image = await Image.findOne({ where: { imageable_id: profileId } });
    return image;
  }

  // The 'deleteImage' method deletes a specified image record
  async deleteImage(image: any) {
    // Destroy (delete) the image record
    await image.destroy();
  }

  // The 'createProductImage' method adds a new image record for a product
  async createProductImage(image: string, productId: number) {
    // Create and return a new image record for the product
    return await Image.create({
      url: image, // URL of the image
      imageable_id: productId, // Product ID associated with the image
      imageable_type: "product", // Type of the imageable entity (product)
    });
  }

  // The 'editProduct' method updates URLs of multiple product images
  async editProduct(newImages: any) {
    // Loop through each image in the newImages object
    for (const image in newImages) {
      const imageName = newImages[image]; // New image URL
      // Update the URL for each image based on its ID
      await Image.update({ url: imageName }, { where: { id: image } });
    }
  }

  // The 'findById' method retrieves an image record by its ID
  async findById(id: string) {
    // Find and return the image record with the specified ID
    return await Image.findByPk(id);
  }

  // The 'getImagesByIdes' method retrieves multiple image records by their IDs
  async getImagesByIdes(imageIds: any) {
    // Find and return all image records with IDs in the provided list
    return await Image.findAll({
      where: {
        id: {
          [Op.in]: imageIds, // List of image IDs to match
        },
      },
    });
  }
}
