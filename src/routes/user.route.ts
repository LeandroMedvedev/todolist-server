import { Router } from 'express';

import { createUserSchema, updateUserSchema } from '../schemas';
import { userController } from '../controllers';
import {
  checkUserExistsMiddleware,
  getUserByIdOr404Middleware,
  isAdminOrOwnerMiddleware,
  validateSchemaMiddleware,
  validateTokenMiddleware,
} from '../middlewares';

const router = Router();

const userRoutes = (): Router => {
  router.post(
    '/signup',
    validateSchemaMiddleware(createUserSchema),
    checkUserExistsMiddleware,
    userController.create
  );

  router.get(
    '',
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    userController.list
  );

  router.get(
    '/:userUuid',
    getUserByIdOr404Middleware,
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    userController.retrieve
  );

  router.patch(
    '/:userUuid',
    getUserByIdOr404Middleware,
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    validateSchemaMiddleware(updateUserSchema),
    checkUserExistsMiddleware,
    userController.update
  );

  router.delete(
    '/:userUuid',
    getUserByIdOr404Middleware,
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    userController.delete
  );

  return router;
};

export default userRoutes;
