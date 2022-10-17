import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../errors';

import { userRepository } from '../repositories';

const getUserByIdOr404Middleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const { userUuid } = request?.params;

  const userExists = await userRepository.retrieve({ userUuid });

  if (!userExists) {
    throw new ErrorHandler(404, 'user not found');
  }

  request.user = userExists;

  return next();
};

export default getUserByIdOr404Middleware;
