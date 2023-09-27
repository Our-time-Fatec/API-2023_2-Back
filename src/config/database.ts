import { config } from 'dotenv';
import  pg  from 'pg';
import { Sequelize } from 'sequelize';

config();
const port =  process.env.DB_PORT || 3002
const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectModule: pg,
  host: process.env.DB_HOST,
  port: +port,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default sequelize;
