import express from "express";
const  {connectDB} = require ('./config/database');
import passport from "passport";
import router from './routes/indexRoute';
import { errorHandler } from "./middleware/errors"
import session from "express-session";

import './config/auth';
const app = express();
import dotenv from "dotenv";
app.use(express.json());
dotenv.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

passport.serializeUser((user: object, done) => {
  done(null, user);
});
// Deserialize user from the session
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errorHandler);
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

