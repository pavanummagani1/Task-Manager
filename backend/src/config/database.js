import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Task } from '../entities/Task.js';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'taskmanager',
   synchronize: true,
  logging: true,
  entities: [Task],
  migrations: ['src/migrations/*.js'],
  subscribers: ['src/subscribers/*.js'],
});