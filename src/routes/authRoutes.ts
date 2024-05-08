import express, { Router } from 'express';
import passport from 'passport';
import {AuthController} from '../controllers/authController';
import {isLoggedIn} from "../middleware/LoggedInWithGoogle" 
const router: Router = express.Router();
router.get('/auth/home', AuthController.home);
router.get('/auth/google',AuthController.googleAuth);
router.get('/auth/google/callback', AuthController.googleAuthCallback);
router.get('/auth/google/failure', AuthController.googleAuthFailure);
router.get('/auth/google/success', isLoggedIn, AuthController.googleAuthSuccess);
router.get('/auth/logout', AuthController.logout);


export default router;