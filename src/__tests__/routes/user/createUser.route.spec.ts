import request from 'supertest';
import { DataSource } from 'typeorm';
import { validate } from 'uuid';

import app from '../../../app';
import AppDataSource from '../../../data-source';
import { userDataOne, userWithoutPassword } from '../../mocks/user';
import route from '../../mocks/user';

describe('Create User', () => {
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

  test('Should be able to create a user | Status: 201', async () => {
    const response = await request(app)
      .post(route.CREATE_USER)
      .send({ ...userDataOne });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userUuid');
    expect(validate(response.body.userUuid)).toBeTruthy();
    expect(response.body.email).toStrictEqual(userDataOne.email);
  });

  test("Shouldn't allow the creation of a user with an existing email | Status: 409", async () => {
    const response = await request(app)
      .post(route.CREATE_USER)
      .send({ ...userDataOne });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(validate(response.body.userUuid)).toBeFalsy();
    expect(response.body.message).toStrictEqual('email already exists');
  });

  test("Shouldn't allow creating user without password property | Status: 400", async () => {
    const response = await request(app)
      .post(route.CREATE_USER)
      .send({ ...userWithoutPassword });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(validate(response.body.userUuid)).toBeFalsy();
    expect(response.body.message).toContain('password is a required field');
  });
});
