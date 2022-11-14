import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from './errors';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import appRoutes from './routes';

const app = express();
// app.use(
//   cors({
//     origin: 'https://client-9kpu13vjo-leandromedvedev.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );
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
