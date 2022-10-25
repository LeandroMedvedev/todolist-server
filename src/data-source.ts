import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { join } from 'path';

const DevAppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: [join(__dirname, './entities/**/*.{ts,js}')],
  migrations: [join(__dirname, './migrations/**/*.{ts,js}')],
});

const TestAppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [join(__dirname, './entities/**/*.{js,ts}')],
});

export default process.env.NODE_ENV === 'test'
  ? TestAppDataSource
  : DevAppDataSource;
