import express from "express";
import { authenticate } from "passport";
const routerPayment = express.Router();
import {authenticated} from '../middleware/auth';
import {TransactionController} from "../controllers/TransactionController";
routerPayment.post("/api/v1/payment/:id",authenticated,TransactionController.pay.bind(TransactionController)); 
routerPayment.get("/paycallback",TransactionController.verifyPayment.bind(TransactionController));
export default routerPayment;
