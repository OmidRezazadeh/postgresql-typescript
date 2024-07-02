import express from 'express';
const routerProfile = express.Router();
import {authenticated} from '../middleware/auth';
import { ProfileController } from '../controllers/ProfileController';

routerProfile.put('/edit/:id',authenticated,ProfileController.edit.bind(ProfileController));
routerProfile.put("/store-image",authenticated ,ProfileController.storeImage.bind(routerProfile));

export default routerProfile;