import express from 'express';
const routerCategory = express.Router();
import {authenticated} from '../middleware/auth';
import {checkAdminRoleMiddleware} from '../middleware/checkRoleAdmin';
import {CategoryController} from "../controllers/Admin/CategoryController";
routerCategory.post("/store",authenticated,checkAdminRoleMiddleware,CategoryController.store.bind(CategoryController));
routerCategory.put("/edit/:id",authenticated,checkAdminRoleMiddleware,CategoryController.edit.bind(CategoryController));
export default routerCategory;