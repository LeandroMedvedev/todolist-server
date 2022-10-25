import { NextFunction, Request, Response } from 'express';

import { ErrorHandler } from '../errors';

const isAdminOrTaskOwnerMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const { isAdmin, userUuid } = request.decoded;
  const { task } = request;

  if (isAdmin) {
    return next();
  }

  if (userUuid !== task.userUuid) {
    throw new ErrorHandler(403, 'missing admin permissions');
  }

  return next();
};

export default isAdminOrTaskOwnerMiddleware;
