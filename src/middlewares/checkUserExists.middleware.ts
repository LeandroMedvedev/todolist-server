import { NextFunction, Request, Response } from 'express';

import { ErrorHandler } from '../errors';
import { userRepository } from '../repositories';
import { User } from '../entities';

const checkUserExistsMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const requestBodyEmail = request.body.email;

  if (!requestBodyEmail) {
    return next();
  }

  const { email } = request.validated as User;

  const userExists: User = await userRepository.retrieve({ email });

  if (userExists) {
    throw new ErrorHandler(409, 'email already exists');
  }

  return next();
};

export default checkUserExistsMiddleware;
