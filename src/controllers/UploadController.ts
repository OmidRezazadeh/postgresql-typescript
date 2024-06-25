import { UploadService } from "../Services/UploadService";
import { Request, Response, NextFunction } from "express";

class uploadController {
  private uploadService: UploadService;
  constructor(uploadService: UploadService) {
    this.uploadService = uploadService;
  }
  async upload(req: Request, res: Response, next: NextFunction) {
    await this.uploadService.validateImage(req, res, next);
  }
}
const uploadService = new UploadService();
const UploadController = new uploadController(uploadService);

export { UploadController };
