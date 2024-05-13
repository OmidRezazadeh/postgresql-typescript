import { Request, Response, NextFunction } from "express";
import passport from "passport";
import User from "../models/user";
import { AuthRepository } from "../Repositories/AuthRepository";
import { AuthService } from "../Services/AuthService";
const { connectDB, authenticate } = require("../config/database");
class authController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
  googleAuthCallback = passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/auth/google/success",
  });

  googleAuthFailure = (req: Request, res: Response, next: NextFunction) => {
    res.send("اهراز هویت با مشکل رو برو شد");
  };

  async googleAuthSuccess(req: Request, res: Response) {
    try {
      let users = req.user;
      const userDataArray = Array.isArray(users) ? users : [users];
      const email = userDataArray[0].emails[0].value;
      const name = userDataArray[0].displayName;
      const exitsUser = await this.authService.findbyEmail(email);
      let token = null;
      let userId = null;
      if (!exitsUser) {
        const user = await this.authService.registerUser(email, name); // Await here
        if (user) {
          userId = user.id;
          token = await this.authService.generateToken(userId, email, name);
        }
      } else {
        userId = exitsUser.id;
        token = await this.authService.generateToken(userId, email, name);
      }
      res.send({
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  home = (req: Request, res: Response) => {
    res.send(`<h1>Home Page</h1> <a href="/auth/google">Login</a>`);
  };

  logout = (req: Request, res: Response) => {
    req.logout(() => {
      res.send("logout");
    });
  };
}
User.initialize(connectDB);
authenticate();
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository); // Initialize authService first
const AuthController = new authController(authService); // Then initialize authController
export { authRepository, authService, AuthController };
