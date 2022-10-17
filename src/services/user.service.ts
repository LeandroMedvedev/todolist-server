import { hash } from 'bcrypt';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';

import { IResponse } from '../interfaces';
import { serializedUserSchema } from '../schemas';
import { userRepository } from '../repositories';
import { User } from '../entities';

class UserService {
  login = async ({ validated }: Request): Promise<IResponse> => {
    const { email, password } = validated as User;
    const user: User = await userRepository.retrieve({ email });

    if (!user) {
      return { status: 401, message: { message: 'invalid credentials' } };
    }

    // const passwordMatch: boolean = await user.comparePassword(password);

    if (!(await user.comparePassword(password))) {
      return { status: 401, message: { message: 'invalid credentials' } };
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return { status: 200, message: { token } };
  };

  create = async ({ validated }: Request): Promise<IResponse> => {
    (validated as User).password = await hash((validated as User).password, 10);
    const user: User = await userRepository.save({ ...(validated as User) });

    const serialized: Partial<User> = await serializedUserSchema.validate(
      user,
      { stripUnknown: true }
    );

    return { status: 201, message: serialized };
  };

  list = async () => {
    const users: User[] = await userRepository.get();
    const serialized = await Promise.all(
      users.map(
        async (user: User) =>
          await serializedUserSchema.validate(user, { stripUnknown: true })
      )
    );
    return { status: 200, message: serialized };
  };

  retrieve = async ({ userUuid }: User) => {
    const user: User = await userRepository.retrieve({ userUuid });
    const serialized: Partial<User> = await serializedUserSchema.validate(
      user,
      { stripUnknown: true }
    );

    return { status: 200, message: serialized };
  };

  update = async ({ user, validated }: Request) => {
    const { userUuid } = user;
    await userRepository.update(userUuid, {
      ...(validated as User),
    });
    const updatedUser: User = await userRepository.retrieve({ userUuid });

    const serialized: Partial<User> = await serializedUserSchema.validate(
      updatedUser,
      {
        stripUnknown: true,
      }
    );

    return { status: 200, message: serialized };
  };

  delete = async ({ userUuid }: User) => {
    await userRepository.delete(userUuid);

    return { status: 204 };
  };
}

export default new UserService();
