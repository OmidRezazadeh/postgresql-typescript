import express from "express";
import { authenticate } from "passport";
const routerPayment = express.Router();
import {authenticated} from '../middleware/auth';
import {PaymentController} from "../controllers/PaymentController";
routerPayment.post("/api/v1/payment",authenticated,PaymentController.pay.bind(PaymentController)); 
routerPayment.get("/paycallback",PaymentController.verifyPayment.bind(PaymentController));
export default routerPayment;
