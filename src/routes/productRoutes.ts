import express from "express";
import {ProductController} from "../controllers/ProductController";
const routerProduct = express.Router();
import {authenticated} from '../middleware/auth';
routerProduct.post('/store', authenticated,ProductController.create.bind(ProductController));
routerProduct.put('/edit/:id', authenticated,ProductController.edit.bind(ProductController));
routerProduct.get("/list/:id?", authenticated,ProductController.list.bind(ProductController));
export default routerProduct;
