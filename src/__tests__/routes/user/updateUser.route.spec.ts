import request from 'supertest';
import { DataSource } from 'typeorm';

import app from '../../../app';
import AppDataSource from '../../../data-source';
import { userDataOne } from '../../mocks/user';
import route from '../../mocks/user';

describe('Update user', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((response) => {
        connection = response;
      })
      .catch((error) => {
        console.error('Error during Data Source initialization', error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should be able to update a user | Status: 200', async () => {
    await request(app)
      .post(route.CREATE_USER)
      .send({ ...userDataOne });

    const loginResponse = await request(app)
      .post(route.USER_SIGNIN)
      .send(userDataOne);

    const updateResponse = await request(app)
      .patch(`${route.GET_USERS}/${loginResponse.body.user.userUuid}`)
      .send({ name: 'Sun Hwa-kwon' })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toStrictEqual('Sun Hwa-kwon');
  });
});
