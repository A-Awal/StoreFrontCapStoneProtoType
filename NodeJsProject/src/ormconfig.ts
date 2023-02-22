import { DataSourceOptions } from "typeorm";

import * as dotenv from "dotenv";
import { Individual } from "./entities/individual";
import { Business } from "./entities/business";
import { Product } from "./entities/product";
import { Order } from "./entities/order";

dotenv.config();

console.log(__dirname + "/entities");
const config: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DATABASE_PORT),
  username: "postgres",
  password: "pielly16",
  database: "postgres",
  entities: [Individual, Business, Product, Order,],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: true,
  migrationsRun: false,
  logging: true,
};

export default config;
