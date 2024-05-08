import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Profile } from "passport-google-oauth20";

class authController {
  googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

  googleAuthCallback = passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/auth/google/success",
  });

  googleAuthFailure = (req: Request, res: Response, next: NextFunction) => {
    res.send("اهراز هویت با مشکل رو برو شد");
  };

  googleAuthSuccess = (req: Request, res: Response, next: NextFunction) => {
    try {
      let users = req.user;
      const userDataArray = Array.isArray(users) ? users : [users];
      console.log(userDataArray[0].displayName);
      if (users) {
        res.send("Welcome," + userDataArray[0].displayName);
      } else {
        // If no users are logged in
        console.log("User is not logged in.");
        res.send("Please log in to access this page.");
      }
    } catch (error) {
        console.log(error);
    }
  };


 home=(req:Request, res:Response)=>{
  res.send(`<h1>Home Page</h1> <a href="/auth/google">Login</a>`);
 }
  logout = (req: Request, res: Response) => {
    req.logout(() => {
      res.redirect("/");
    });
  };

}
const AuthController = new authController();

export { AuthController };
