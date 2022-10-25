import request from 'supertest';
import { DataSource } from 'typeorm';

import app from '../../../app';
import AppDataSource from '../../../data-source';
import { userDataOne } from '../../mocks/user';
import taskRoute, { taskDataOne } from '../../mocks/task';
import userRoute from '../../mocks/user';

describe('Delete task', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (response) => {
        connection = response;

        await request(app)
          .post(userRoute.CREATE_USER)
          .send({ ...userDataOne });
      })
      .catch((error) => {
        console.error('Error during Data Source initialization', error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should be able to delete a task | Status: 204', async () => {
    const loginResponse = await request(app)
      .post(userRoute.USER_SIGNIN)
      .send({ ...userDataOne });

    const taskResponse = await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskDataOne })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`${taskRoute.GET_TASKS}/${taskResponse.body.taskUuid}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
  });
});
