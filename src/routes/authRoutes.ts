import express from 'express';
import {AuthController} from '../controllers/AuthController';
import {isLoggedIn} from "../middleware/LoggedInWithGoogle" 
const authRoutes = express.Router();
authRoutes.get('/auth/home', AuthController.home.bind(AuthController));
authRoutes.get('/auth/google',AuthController.googleAuth.bind(AuthController));
authRoutes.get('/auth/google/callback', AuthController.googleAuthCallback.bind(AuthController));
authRoutes.get('/auth/google/failure', AuthController.googleAuthFailure.bind(AuthController));
authRoutes.get('/auth/google/success', isLoggedIn, AuthController.googleAuthSuccess.bind(AuthController));
authRoutes.get('/auth/logout', AuthController.logout);

export default authRoutes;