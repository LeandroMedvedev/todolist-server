import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../../app';

import AppDataSource from '../../../data-source';
import route from '../../mocks/user';
import { userDataOne } from '../../mocks/user';

describe('User listing', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (response) => {
        connection = response;

        await request(app).post(route.CREATE_USER).send(userDataOne);
      })
      .catch((error) => {
        console.error('Error during Data Source initialization', error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Non-admin user shouldn't be able to list users | Status: 403", async () => {
    const loginResponse = await request(app)
      .post(route.USER_SIGNIN)
      .send(userDataOne);

    const response = await request(app)
      .get(route.GET_USERS)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });
});
