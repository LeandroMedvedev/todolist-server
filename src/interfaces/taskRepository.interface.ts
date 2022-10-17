import { DeleteResult, UpdateResult } from 'typeorm';
import { Task } from '../entities';

export interface ITaskRepository {
  save: (task: Partial<Task>) => Promise<Task>;
  all: () => Promise<Task[]>;
  retrieve: (payload: object) => Promise<Task>;
  update: (taskUuid: string, payload: Partial<Task>) => Promise<UpdateResult>;
  delete: (taskUuid: string) => Promise<DeleteResult>;
}
