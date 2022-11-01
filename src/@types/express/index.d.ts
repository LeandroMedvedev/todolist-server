import { Task, User } from '../../entities';

declare global {
  namespace Express {
    interface Request {
      decoded: User;
      validated: User | Task;
      user: User;
      task: Task;
    }
  }
}
