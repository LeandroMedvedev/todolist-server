import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  entities: [join(__dirname, './entities/**/*.{ts,js}')],
  migrations: [join(__dirname, './migrations/**/*.{ts,js}')],
});
