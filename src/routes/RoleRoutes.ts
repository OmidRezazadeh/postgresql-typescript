import express, { Router } from 'express';
const routerRole: Router = express.Router();
import {RoleController} from '../controllers/Admin/RoleController';
routerRole.post('/store',RoleController.store.bind(RoleController));
export default routerRole;
