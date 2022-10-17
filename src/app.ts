import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from './errors';

import appRoutes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
appRoutes(app);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  return errorHandler(error, response);
});

export default app;
