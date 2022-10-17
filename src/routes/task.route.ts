import { Router } from 'express';
import { taskController } from '../controllers';

import {
  getTaskByIdOr404Middleware,
  isAdminOrOwnerMiddleware,
  validateSchemaMiddleware,
  validateTokenMiddleware,
} from '../middlewares';
import { createTaskSchema, updatedTaskSchema } from '../schemas';

const router = Router();

const taskRoutes = (): Router => {
  router.post(
    '',
    validateTokenMiddleware,
    validateSchemaMiddleware(createTaskSchema),
    taskController.create
  );

  router.get(
    '',
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    taskController.list
  );

  router.get(
    '/adm/:taskUuid',
    getTaskByIdOr404Middleware,
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    taskController.retrieve
  );

  router.get('/own', validateTokenMiddleware, taskController.listOwn);

  router.patch(
    '/:taskUuid',
    getTaskByIdOr404Middleware,
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    validateSchemaMiddleware(updatedTaskSchema),
    taskController.update
  );

  router.delete(
    '/:taskUuid',
    getTaskByIdOr404Middleware,
    validateTokenMiddleware,
    isAdminOrOwnerMiddleware,
    taskController.delete
  );

  return router;
};

export default taskRoutes;
