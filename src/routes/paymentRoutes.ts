import express from "express";
import { authenticate } from "passport";
const routerPayment = express.Router();
import {authenticated} from '../middleware/auth';
import {PaymentController} from "../controllers/PaymentController";
routerPayment.post("/payment",authenticated,PaymentController.pay.bind(PaymentController)); 
export default routerPayment;
