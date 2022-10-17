import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../errors';
import { taskRepository } from '../repositories';

const getTaskByIdOr404Middleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const { taskUuid } = request?.params;

  const taskExists = await taskRepository.retrieve({ taskUuid });

  if (!taskExists) {
    throw new ErrorHandler(404, 'task not found');
  }

  request.task = taskExists;

  return next();
};

export default getTaskByIdOr404Middleware;
