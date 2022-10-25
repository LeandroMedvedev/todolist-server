import { User } from '../entities';

export interface IResponse {
  status: number;
  message: object;
}

export interface IUserResponse {
  status: number;
  message: Partial<User>;
}
