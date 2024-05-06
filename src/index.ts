import express, { NextFunction, Request, Response } from "express";
const connectDB = require("./config/database");
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRoutes from "./routes/authRoutes";
import session, { SessionOptions } from "express-session";
const app = express();
app.use(express.json());
dotenv.config();

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "870131656794-2a3lg2nf55ur2hj8aipkg1g2a5bumd4e.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // Assuming 'err' is defined somewhere, otherwise use null
      done(null, profile);
    }
  )
);
passport.serializeUser((user: object, done) => {
  done(null, user);
});
// Deserialize user from the session
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});
function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
  req.user ? next() : res.sendStatus(401); 
}
// Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/login/protected",
  })
);
app.get("/auth/google/failure", (req: Request, res: Response) => {
  res.send("worng");
});
app.get("/auth/google/successure", (req: Request, res: Response) => {
  res.send("success");
});
app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Home Page</h1> <a href="/auth/google">Login</a>`);
});
app.get("/login/protected",isLoggedIn, (req: Request, res: Response) => {
  let users = req.user;
  const userDataArray = Array.isArray(users) ? users : [users];
  console.log(userDataArray[0].displayName);
  if (users) {
    res.send("Welcome," +  userDataArray[0].displayName ); 
  } else {
    // If no users are logged in
    console.log("User is not logged in.");
    res.send("Please log in to access this page.");
  }
});
   
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});
const PORT = process.env.PORT;
connectDB
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(PORT, () =>
      console.log(`Node API app is running in mode on port ${PORT}`)
    );
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

