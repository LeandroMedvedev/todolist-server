import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from './errors';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import appRoutes from './routes';

const app = express();
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Content-Range',
      'Content-MD5',
      'X-Api-Version',
      'X-Content-Range',
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Date'
    ],
    preflightContinue: false,
  })
);
app.use(express.json());
appRoutes(app);

app.use(
  '/api-documentation',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  return errorHandler(error, response);
});

export default app;
