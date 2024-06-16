import express from 'express';
const routerUser = express.Router();
import {UserController} from '../controllers/Admin/UserController';
routerUser.get("/list/:id?",UserController.list.bind(UserController));
export default routerUser;