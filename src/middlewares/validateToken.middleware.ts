import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';

import { ErrorHandler } from '../errors';
import { User } from '../entities';

const validateTokenMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  let token: string | undefined = request.headers?.authorization;

  if (!token) {
    throw new ErrorHandler(401, 'missing authorization token');
  }

  token = token.split(' ')[1];

  return verify(
    token,
    process.env.SECRET_KEY,
    (error: VerifyErrors, decoded: string | JwtPayload) => {
      if (error) {
        throw new ErrorHandler(401, error.message);
      }

      request.decoded = decoded as User;

      return next();
    }
  );
};

export default validateTokenMiddleware;
