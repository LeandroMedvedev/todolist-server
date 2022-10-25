import request from 'supertest';
import { DataSource } from 'typeorm';
import { validate } from 'uuid';

import app from '../../../app';
import AppDataSource from '../../../data-source';
import { taskDataOne, taskWithoutDescription } from '../../mocks/task';
import { userDataOne } from '../../mocks/user';
import taskRoute from '../../mocks/task';
import userRoute from '../../mocks/user';

describe('Create Task', () => {
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

  test('Should be able to create a task | Status: 201', async () => {
    const loginResponse = await request(app)
      .post(userRoute.USER_SIGNIN)
      .send({ ...userDataOne });

    const response = await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskDataOne })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('taskUuid');
    expect(validate(response.body.taskUuid)).toBeTruthy();
    expect(response.body.description).toStrictEqual(taskDataOne.description);
  });

  test("Shouldn't allow the creation of a task without token | Status: 401", async () => {
    const response = await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskDataOne });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(validate(response.body.userUuid)).toBeFalsy();
    expect(response.body.message).toStrictEqual('missing authorization token');
  });

  test("Shouldn't allow creating task without description property | Status: 400", async () => {
    const loginResponse = await request(app)
      .post(userRoute.USER_SIGNIN)
      .send({ ...userDataOne });

    const response = await request(app)
      .post(taskRoute.CREATE_TASK)
      .send({ ...taskWithoutDescription })
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(validate(response.body.taskUuid)).toBeFalsy();
    expect(response.body.message).toContain('description is a required field');
  });
});
