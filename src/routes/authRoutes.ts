import express, { Router } from 'express';
import passport from 'passport';
import {AuthController} from '../controllers/AuthController';
import {isLoggedIn} from "../middleware/LoggedInWithGoogle" 
const router: Router = express.Router();
router.get('/auth/home', AuthController.home.bind(AuthController));
router.get('/auth/google',AuthController.googleAuth.bind(AuthController));
router.get('/auth/google/callback', AuthController.googleAuthCallback.bind(AuthController));
router.get('/auth/google/failure', AuthController.googleAuthFailure.bind(AuthController));
router.get('/auth/google/success', isLoggedIn, AuthController.googleAuthSuccess.bind(AuthController));
router.get('/auth/logout', AuthController.logout);


export default router;