import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../entities';

export interface IUserRepository {
  save: (user: Partial<User>) => Promise<User>;
  get: () => Promise<User[]>;
  retrieve: (payload: object) => Promise<User>;
  update: (userUuid: string, payload: Partial<User>) => Promise<UpdateResult>;
  delete: (userUuid: string) => Promise<DeleteResult>;
}
