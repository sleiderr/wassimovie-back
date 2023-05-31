import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH,
  synchronize: false,
  entities: ['./src/models/entities/*.js'],
  migrations: ['./src/models/migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
});