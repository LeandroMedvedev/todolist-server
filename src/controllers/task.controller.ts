import { Request, Response } from 'express';
import { taskService } from '../services';

class TaskController {
  create = async (request: Request, response: Response) => {
    const { status, message } = await taskService.createTask(request);
    return response.status(status).json(message);
  };

  list = async (_: Request, response: Response) => {
    const { status, message } = await taskService.listTasks();
    return response.status(status).json(message);
  };

  retrieve = async (request: Request, response: Response) => {
    const { status, message } = await taskService.retrieve(request.task);
    return response.status(status).json(message);
  };

  findByDescription = async (request: Request, response: Response) => {
    const {status, message} = await taskService.findByDescription(request);
    return response.status(status).json(message);
  }

  listOwn = async (request: Request, response: Response) => {
    const { tasks } = request.decoded;
    return response.status(200).json(tasks);
  };

  update = async (request: Request, response: Response) => {
    const { status, message } = await taskService.update(request);
    return response.status(status).json(message);
  };

  delete = async (request: Request, response: Response) => {
    const { status } = await taskService.delete(request.task);
    return response.status(status).json();
  };
}

export default new TaskController();
