import { Repository } from 'typeorm';

import AppDataSource from '../data-source';
import { Task } from '../entities';
import { ITaskRepository } from '../interfaces';

class TaskRepository implements ITaskRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Task);
  }

  save = async (task: Partial<Task>) => {
    return await this.ormRepository.save(task);
  };

  all = async () => {
    return await this.ormRepository.find();
  };

  retrieve = async (payload: object) => {
    return await this.ormRepository.findOneBy({ ...payload });
  };

  // ADM only
  findByDescription = async (description: object) => {
    return await this.ormRepository.findBy({ ...description });
  };

  update = async (taskUuid: string, payload: Partial<Task>) => {
    return await this.ormRepository.update(taskUuid, { ...payload });
  };

  delete = async (taskUuid: string) => {
    return await this.ormRepository.delete(taskUuid);
  };
}

export default new TaskRepository();
