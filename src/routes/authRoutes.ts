import express, { Router } from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController';

const router: Router = express.Router();

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });
 
export default router;