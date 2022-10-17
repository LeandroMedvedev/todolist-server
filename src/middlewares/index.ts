import checkUserExistsMiddleware from './checkUserExists.middleware';
import isAdminOrOwnerMiddleware from './isAdminOrOwner.middleware';
import getTaskByIdOr404Middleware from './getTaskByIdOr404.middleware';
import getUserByIdOr404Middleware from './getUserByIdOr404.middleware';
import validateSchemaMiddleware from './validateSchema.middleware';
import validateTokenMiddleware from './validateToken.middleware';

export {
  checkUserExistsMiddleware,
  isAdminOrOwnerMiddleware,
  getTaskByIdOr404Middleware,
  getUserByIdOr404Middleware,
  validateSchemaMiddleware,
  validateTokenMiddleware,
};
