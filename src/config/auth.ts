import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
export const passportConfig = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALL_BACK_URL!,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // Assuming 'err' is defined somewhere, otherwise use null
      done(null, profile);
    }
  )
);
