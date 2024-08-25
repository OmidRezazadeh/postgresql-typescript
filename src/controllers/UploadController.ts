import { UploadService } from "../Services/UploadService";
import { Request, Response, NextFunction } from "express";

// uploadController class handles incoming requests related to file uploads.
class uploadController {
  // Instance of UploadService to handle the business logic for uploading files.
  private uploadService: UploadService;

  // Constructor injects the UploadService dependency.
  constructor(uploadService: UploadService) {
    this.uploadService = uploadService;
  }

  // upload method handles the file upload process.
  async upload(req: Request, res: Response, next: NextFunction) {
    // Delegate the image validation process to the UploadService.
    await this.uploadService.validateImage(req, res, next);
  }
}

// Instantiate the UploadService to be used by the uploadController.
const uploadService = new UploadService();

// Instantiate the uploadController with the necessary service.
const UploadController = new uploadController(uploadService);

// Export the UploadController instance for use in routing.
export { UploadController };
