
import { DataSourceOptions } from "typeorm";
import { User } from "./entities/user";
import { Business } from "./entities/business";
import { Product } from "./entities/product";
import { Order } from "./entities/order";
import { Token } from "./entities/token";

const config: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: 'postgres',
  password: "mantiq#1",
  database: 'postgres',
  entities: [User, Business, Product, Order, Token],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: true,
  migrationsRun: false,
  logging: true,
};

export default config;

// import { DataSourceOptions } from "typeorm";
// import { User } from "./entities/user";
// import { Business } from "./entities/business";
// import { Product } from "./entities/product";
// import { Order } from "./entities/order";
// import { Token } from "./entities/token";
// import * as dotenv from "dotenv";
// dotenv.config();

// const config: DataSourceOptions = {
//   type: "postgres",
//   host: "localhost",
//   port: Number(process.env.DATABASE_PORT),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [User, Business, Product, Order, Token],
//   migrations: [__dirname + "/migrations/*{.ts,.js}"],
//   synchronize: true,
//   migrationsRun: false,
//   logging: true,
// };

// export default config;
