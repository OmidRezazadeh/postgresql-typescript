import { Request, Response, NextFunction } from "express";
import { upload } from "../utils/upload"; 
import crypto from 'crypto'; 
import sharp from "sharp"; 
import path from "path";
import { throwCustomError } from "../utils/errorHandling";
export class UploadService {

  async validateImage(req: Request, res: Response, next: NextFunction) {
    
    try {
      // Use the upload middleware to handle the file upload
      upload(req, res, async (err: any) => {
        if (err) {
          // Handle file size limit error
          if (err.code === "LIMIT_FILE_SIZE") {
            throwCustomError("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد",400);
          } else {
            // Pass other errors to the next middleware
            next(err);
          }
        }

        // Check if a file was uploaded
        if (!req.file) {
          return res.status(400).json({ message: "لطفا عکس را اپلود کنید" });
        }

        // Generate a new random image name
        const nawImageName = crypto.randomBytes(10).toString('hex');
        // Get the file extension from the original file name
        const mimeType = req.file.originalname.split(".").pop();
        // Combine the new name and extension to create the new file name
        const fileName = `${nawImageName}.${mimeType}`;

        // Process the image with sharp and save it with the new name
        await sharp(req.file.buffer)
          .jpeg({ quality: 60 }) // Convert the image to JPEG with 60% quality
          .toFile(path.join(__dirname, '../Public/upload/images', fileName));

        // Construct the URL to the uploaded image
        const image = `http://localhost:3000/uploads/${fileName}`;

        // Send the image URL as the response
        res.status(200).json({ image });
      });
    } catch (error) {
      console.log(error); // Log any caught errors
      next(error); // Pass the error to the next middleware
    }
  }
}
