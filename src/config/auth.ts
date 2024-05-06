// import express, { Request, Response, NextFunction } from "express";
// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// const db = require("../models/user"); // Importing the Sequelize models


// passport.serializeUser((user: any, done: any) => {
//     done(null, user);
// });

// passport.deserializeUser((user: any, done: any) => {
//     done(null, user);
// });

//  module.exports = passport.use(new GoogleStrategy({
//  clientID: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     callbackURL: process.env.CALL_BACK_URL,
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     db.User.findOrCreate({ googleId: profile.id }, function (err: Error, db.user) {
//       return cb(err, user);
//     });
//   }


// module.exports = passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "1008355276900-hn6t2rvqnvidg9ahf0h5neq2aa7ld9hl.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "http://localhost:3000/google/callback",
//       passReqToCallback: true,
//     },
//     async (
//       req: Request,
//       accessToken: string,
//       refreshToken: string,
//       profile: any,
//       done: (error: any, user?: any) => void
//     ) => {
//       try {
//         const exitingUser = await db.User.findOne({
//           email: profile.emails[0].value,
//         });
//         if (exitingUser) {
//           return done(null, exitingUser);
//         }
//         const newUser = await db.User.create({
//           email: profile.emails[0].value,
//           name: profile.displayName,
//         });
//         done(null, newUser);
//       } catch (error: any) {
//         console.log(error);
//       }
//     }
//   )
// );
