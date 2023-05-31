import { DataSource } from 'typeorm';

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