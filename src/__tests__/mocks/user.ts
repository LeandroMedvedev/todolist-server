import { Task } from '../../entities';

interface IUserCreate {
  userUuid?: string;
  name?: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  tasks?: Task[];
}

export const userDataOne: IUserCreate = {
  name: 'Leandro Medvedev',
  email: 'leandromedvedev@lost.com',
  password: '-)lost(-',
};

export const userDataTwo: IUserCreate = {
  name: 'Leandro Medvedev',
  email: 'leandromedvedev@proton.me',
  password: '-)lost(-',
};

export const userWithoutPassword: IUserCreate = {
  name: 'John Locke',
  email: 'lockejohn@lost.com',
};

class UserRoutes {
  CREATE_USER = '/api/users/signup';
  GET_USERS = '/api/users';
  USER_SIGNIN = '/api/users/signin';
}

export default new UserRoutes();
