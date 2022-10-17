import { Request, Response } from 'express';

import { userService } from '../services';

class UserController {
  login = async (request: Request, response: Response) => {
    const { status, message } = await userService.login(request);
    return response.status(status).json(message);
  };

  create = async (request: Request, response: Response) => {
    const { status, message } = await userService.create(request);
    return response.status(status).json(message);
  };

  list = async (_: Request, response: Response) => {
    const { status, message } = await userService.list();
    return response.status(status).json(message);
  };

  retrieve = async (request: Request, response: Response) => {
    const { status, message } = await userService.retrieve(request.user);
    return response.status(status).json(message);
  };

  update = async (request: Request, response: Response) => {
    const { status, message } = await userService.update(request);
    return response.status(status).json(message);
  };

  delete = async (request: Request, response: Response) => {
    const { status } = await userService.delete(request.user);
    return response.status(status).json();
  };
}

export default new UserController();
