import express from 'express';
const routerCart = express.Router();
import {authenticated} from '../middleware/auth';
import {CartController} from "../controllers/CartController";

routerCart.post("/store",authenticated,CartController.store.bind(CartController));
export default routerCart