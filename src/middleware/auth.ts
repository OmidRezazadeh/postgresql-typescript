import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  try {
    if (!authHeader) {
      return res.status(400).json({ message: 'مجوز کافی ندارید' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err: any) => {
      if (err) {

        if (err instanceof TokenExpiredError) {
          const ExpiredError = new Error('لطفا مجددا لاگین کنید');
          (ExpiredError as any).status = 400;
          throw ExpiredError;
        }
        const FailedAuthenticateError = new Error('لاگین با مشکل مواجه شد');
        (FailedAuthenticateError as any).status = 400;
        throw FailedAuthenticateError;
      }

    });
    next();
  } catch (err) {
    next(err);
  }
};