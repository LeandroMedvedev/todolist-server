import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Task } from '../entities';
import { ITaskRepository } from '../interfaces';

class TaskRepository implements ITaskRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Task);
  }

  save = async (task: Partial<Task>) => await this.ormRepository.save(task);

  all = async () => await this.ormRepository.find();

  retrieve = async (payload: object) => {
    return await this.ormRepository.findOneBy({ ...payload });
  };

  update = async (taskUuid: string, payload: Partial<Task>) =>
    await this.ormRepository.update(taskUuid, { ...payload });

  delete = async (taskUuid: string) =>
    await this.ormRepository.delete(taskUuid);
}

export default new TaskRepository();
