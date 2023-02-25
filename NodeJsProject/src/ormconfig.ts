import { DataSourceOptions } from "typeorm";

import * as dotenv from "dotenv";
import { Individual } from "./entities/individual";
import { Business } from "./entities/business";
import { Product } from "./entities/product";
import { Order } from "./entities/order";

dotenv.config();


const config: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Individual, Business, Product, Order],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: true,
  migrationsRun: false,
  logging: true,
};

export default config;
