import express from 'express';
const routerRole = express.Router();
import {RoleController} from '../controllers/Admin/RoleController';
routerRole.post('/store',RoleController.store.bind(RoleController));
export default routerRole;
