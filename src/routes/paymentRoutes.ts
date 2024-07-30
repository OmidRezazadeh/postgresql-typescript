import express from "express";
import { authenticate } from "passport";
const routerPayment = express.Router();
import {authenticated} from '../middleware/auth';
import {PaymentController} from "../controllers/PaymentController";
routerPayment.post("/payment",authenticated,PaymentController.pay.bind(PaymentController)); 
routerPayment.get("/paycallback",authenticated,PaymentController.home.bind(PaymentController));
export default routerPayment;
