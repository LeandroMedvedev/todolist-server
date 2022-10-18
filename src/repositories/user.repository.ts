import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { IUserRepository } from '../interfaces';
import { User } from '../entities';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>) => await this.ormRepository.save(user);

  get = async () => await this.ormRepository.find();

  retrieve = async (payload: object) => {
    return await this.ormRepository.findOneBy({ ...payload });
  };

  update = async (userUuid: string, payload: Partial<User>) =>
    await this.ormRepository.update(userUuid, { ...payload });

  delete = async (userUuid: string) =>
    await this.ormRepository.delete(userUuid);
}

export default new UserRepository();
