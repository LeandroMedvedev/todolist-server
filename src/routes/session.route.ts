import { Router } from 'express';

import { loginUserSchema } from '../schemas';
import { userController } from '../controllers';
import { validateSchemaMiddleware } from '../middlewares';

const router = Router();

const sessionRoutes = (): Router => {
  router.post(
    '/signin',
    validateSchemaMiddleware(loginUserSchema),
    userController.login
  );

  return router;
};

export default sessionRoutes;
