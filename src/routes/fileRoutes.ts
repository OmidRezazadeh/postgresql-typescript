import express from "express";
import { UploadController } from "../controllers/UploadController";
const uploadRouter = express.Router();
uploadRouter.post("/", UploadController.upload.bind(UploadController));

export default uploadRouter;
