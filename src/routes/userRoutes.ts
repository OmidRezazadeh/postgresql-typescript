import express from 'express';
const routerUser = express.Router();
import {UserController} from '../controllers/Admin/UserController';
// routerUser.post("/assign",UserController.assignRole.bind(UserController));
export default routerUser;