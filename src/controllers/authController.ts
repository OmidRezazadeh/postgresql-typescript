import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Profile } from 'passport-google-oauth20';
export const serializeUser = (user: any, done: any) => {
    done(null, user);
};

export const deserializeUser = (user: any, done: any) => {
    done(null, user);
};

export const googleAuthCallback = (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
    return done(null, profile);
};
