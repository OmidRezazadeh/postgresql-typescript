import express from "express";
import { UploadController } from "../controllers/UploadController";
const uploadRouter = express.Router();

/**
 * @openapi
 * /api/v1/upload:
 *   post:
 *     summary: Upload a file.
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image to be uploaded.
 *     responses:
 *       200:
 *         description: image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://example.com/uploads/filename.jpg"
 *       400:
 *         description: Bad request. image is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */
uploadRouter.post("/", UploadController.upload.bind(UploadController));

export default uploadRouter;
