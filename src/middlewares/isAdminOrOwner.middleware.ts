import { NextFunction, Request, Response } from 'express';

import { ErrorHandler } from '../errors';

const isAdminOrOwnerMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const { isAdmin, userUuid } = request.decoded;
  const userUuidParams = request.params?.userUuid;

  if (isAdmin) {
    return next();
  }

  if (userUuid !== userUuidParams) {
    throw new ErrorHandler(403, 'missing admin permissions');
  }

  return next();
};

export default isAdminOrOwnerMiddleware;
