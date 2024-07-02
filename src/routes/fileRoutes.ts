import express from "express";
import { UploadController } from "../controllers/UploadController";
const uploadRouter = express.Router();
import {authenticated} from '../middleware/auth';
uploadRouter.post("/", UploadController.upload.bind(UploadController));

export default uploadRouter;
