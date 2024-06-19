import express from 'express';
import {checkAdminRoleMiddleware} from '../middleware/checkRoleAdmin';
const routerUser = express.Router();
import {UserController} from '../controllers/Admin/UserController';
import {authenticated} from "../middleware/auth"
routerUser.get("/list/:id?",authenticated,checkAdminRoleMiddleware,UserController.list.bind(UserController));
export default routerUser;