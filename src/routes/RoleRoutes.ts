import express from 'express';
const routerRole = express.Router();
import {RoleController} from '../controllers/Admin/RoleController';
routerRole.post('/store',RoleController.store.bind(RoleController));
routerRole.put('/edit/:id',RoleController.edit.bind(RoleController));
export default routerRole;
