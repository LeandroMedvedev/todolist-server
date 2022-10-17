import { Express, Router } from 'express';

import sessionRoutes from './session.route';
import taskRoutes from './task.route';
import userRoutes from './user.route';

const router: Router = Router();

const apiRouter = (): Router => {
  router.use('/users', sessionRoutes());
  router.use('/users', userRoutes());
  router.use('/tasks', taskRoutes());

  return router;
};

const appRoutes = (app: Express): void => {
  app.use('/api', apiRouter());
};

export default appRoutes;
