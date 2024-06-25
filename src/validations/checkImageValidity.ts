import { tempImage, mimeTypeArray } from "../config/configPath";
import { throwCustomError } from "../utils/errorHandling";
import path from "path";
import fs from "fs";

export const checkImageValidity = (imageName: string) => {
  // Creating the file path using the provided image data
  const filePath = tempImage + imageName;

  const fileExtension = path.extname(filePath).toLowerCase(); // Extracting the file extension and converting it to lowercase
  if (!mimeTypeArray.includes(fileExtension)) {
    // Checking if the file extension is not in the allowed mime types
    throwCustomError("پسوند عکس معتبر نیست ", 400);
  }
  if (!fs.existsSync(filePath)) {
    // Checking if the file doesn't exist in the specified path
    throwCustomError("عکس مورد نظر یافت نشد ", 400);
  }
};
