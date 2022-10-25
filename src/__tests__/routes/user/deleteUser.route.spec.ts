import request from 'supertest';
import { DataSource } from 'typeorm';

import app from '../../../app';
import AppDataSource from '../../../data-source';
import route from '../../mocks/user';
import { userDataOne } from '../../mocks/user';

describe('Delete user', () => {
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

  test('Should be able to delete a user | Status: 204', async () => {
    await request(app)
      .post(route.CREATE_USER)
      .send({ ...userDataOne });

    const loginResponse = await request(app)
      .post(route.USER_SIGNIN)
      .send(userDataOne);

    const response = await request(app)
      .delete(`${route.GET_USERS}/${loginResponse.body.user.userUuid}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
