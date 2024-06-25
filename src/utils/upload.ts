import { Request, Express, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

const allowedMimeTypes: string[] = ['image/jpeg', 'image/png'];

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): any => {
    const fileMimeType: string = file.mimetype;
    if (allowedMimeTypes.includes(fileMimeType)) {
        cb(null,true);
    }else{
        cb(undefined!, false);
    }
};
const upload=multer({
    limits:{fileSize: 4000000},
    fileFilter:fileFilter,
}).single('image');


export {upload,fileFilter};