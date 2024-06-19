import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AuthRepository } from "../Repositories/AuthRepository";
import { ProfileRepository } from "../Repositories/ProfileRepository";
import { UserRepository } from "../Repositories/UserRepository";
import { AuthService } from "../Services/AuthService";
import { ProfileService } from "../Services/ProfileService";
import { UserService } from "../Services/UserService";

const {connectDB} = require("../config/database");
class authController {
  private userService : UserService
  private authService: AuthService;
  private profileService: ProfileService;
  constructor(
    authService: AuthService,
     profileService: ProfileService,
     userService: UserService
    
    ) {
    this.authService = authService,
    this.userService = userService;
     this.profileService = profileService
  }
  googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
  googleAuthCallback = passport.authenticate("google", {
    failureRedirect: "/auth/google/failed",
    successRedirect: "/auth/google/success",
  });

  googleAuthFailure = (req: Request, res: Response, next: NextFunction) => {
    res.send("اهراز هویت با مشکل رو برو شد");
  };

  async googleAuthSuccess(req: Request, res: Response) {
    let transaction;
    try {
      // Extract the authenticated user from the request object
      let users = req.user;
      const userDataArray = Array.isArray(users) ? users : [users];
      
      // Retrieve the email and display name from the user data
      const email = userDataArray[0].emails[0].value;
      const name = userDataArray[0].displayName;
  
      // Check if the user already exists in the database using their email
      const existingUser = await this.authService.findByEmail(email);
      let token: string | null = null;
      let userId: number;
      let user: any = null;
  
      // Start a new database transaction
      const sequelize = connectDB;
      transaction = await sequelize.transaction();
  
      // If the user does not exist, register a new user and create their profile
      if (!existingUser) {
        user = await this.authService.registerUser(email, name, transaction);
        userId = user.id;
        await this.profileService.create(userId, transaction);
        await this.userService.assign(userId, transaction);
      } else {
        // If the user exists, use their existing ID
        userId = existingUser.id;
      }
  
      // Generate an authentication token for the user
      token = await this.authService.generateToken(userId, email, name);
  
      // Commit the transaction if everything is successful
      await transaction.commit();
      res.send({ token });
    } catch (error) {
      console.error(error);
      // Rollback the transaction in case of an error
      if (transaction) {
        await transaction.rollback();
      }
      // Send a 500 Internal Server Error response
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
const authService = new AuthService(authRepository); 
const profileRepository = new ProfileRepository(); 
const profileService = new ProfileService(profileRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const AuthController = new authController(authService, profileService,userService); 
export { authRepository, authService, AuthController };
