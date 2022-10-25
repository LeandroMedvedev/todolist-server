import request from 'supertest';
import { DataSource } from 'typeorm';

import app from '../../../app';
import AppDataSource from '../../../data-source';
import { userDataOne } from '../../mocks/user';
import taskRoute, { taskDataOne, taskDataTwo } from '../../mocks/task';
import userRoute from '../../mocks/user';
import { ErrorHandler } from '../../../errors';

describe('Task listing', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (response) => {
        connection = response;
      })
      .catch((error) => {
        console.error('Error during Data Source initialization', error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should be able to list own tasks | Status: 200', async () => {
    await request(app)
      .post(userRoute.CREATE_USER)
      .send({ ...userDataOne });

    const loginResponse = await request(app)
      .post(userRoute.USER_SIGNIN)
      .send({ ...userDataOne });

    await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskDataOne })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskDataTwo })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`${taskRoute.GET_TASKS}/own`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
  });

  test('Should be able to filter tasks by description | Status: 200', async () => {
    await request(app)
      .post(userRoute.CREATE_USER)
      .send({ ...userDataOne });

    const loginResponse = await request(app)
      .post(userRoute.USER_SIGNIN)
      .send({ ...userDataOne });

    const taskOne = await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskDataOne })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskDataTwo })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(
        `${taskRoute.GET_TASKS}/description?description=${taskOne.body.description}`
      )
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body[0].description).toStrictEqual(
      taskOne.body.description
    );
  });

  test("Non-admin user shouldn't be able to list tasks from all users | Status: 403", async () => {
    await request(app)
      .post(userRoute.CREATE_USER)
      .send({ ...userDataOne });

    const loginResponse = await request(app)
      .post(userRoute.USER_SIGNIN)
      .send({ ...userDataOne });

    const response = await request(app)
      .get(`${taskRoute.GET_TASKS}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('missing admin permissions');
  });
});
