import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AuthRepository } from "../Repositories/AuthRepository";
import { ProfileRepository } from "../Repositories/ProfileRepository";
import { AuthService } from "../Services/AuthService";
import { ProfileService } from "../Services/ProfileService";

const { connectDB} = require("../config/database");
class authController {
  private authService: AuthService;
  private profileService: ProfileService;
  constructor(authService: AuthService, profileService: ProfileService) {
    (this.authService = authService), (this.profileService = profileService);
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
    let transaction;
    try {
      let users = req.user;
      const userDataArray = Array.isArray(users) ? users : [users];
      const email = userDataArray[0].emails[0].value;
      const name = userDataArray[0].displayName;

      const existingUser = await this.authService.findbyEmail(email);
      let token: string | null = null;
      let userId: number;
      let user: any = null;
      const sequelize = connectDB;
      transaction = await sequelize.transaction();
      if (!existingUser) {
        user = await this.authService.registerUser(email, name, transaction);
        userId = user.id;
        await this.profileService.create(userId, transaction);
      } else {
        userId = existingUser.id;
      }
      token = await this.authService.generateToken(userId, email, name);
      await transaction.commit();
      res.send({ token });
    } catch (error) {
      console.error(error);
      if (transaction) {
        await transaction.rollback();
      }
      res.status(500).send("Internal server error");
      console.error(error);
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


const authRepository = new AuthRepository();
const authService = new AuthService(authRepository); // Initialize authService first
const profileRepository = new ProfileRepository(); //
const profileService = new ProfileService(profileRepository);
const AuthController = new authController(authService, profileService); // Then initialize authController
export { authRepository, authService, AuthController };
