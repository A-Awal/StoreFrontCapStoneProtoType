import { DataSourceOptions } from "typeorm";
import { User } from "./entities/user";
import { Store } from "./entities/store";
import { Product } from "./entities/product";
import { Order } from "./entities/order";
import { Token } from "./entities/token";
import { OrderItems } from "./entities/purchase";
import { CreditCard } from "./entities/payment_method";
import { Shipping } from "./entities/shipping_details";
import { Image } from "./entities/photo";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Token,
    Store,
    OrderItems,
    Product,
    Order,
    CreditCard,
    Shipping,
    Image
  ],
  migrations: ["build/migrations/*{.ts,.js}"],
  synchronize: true,
  migrationsRun: false,
  logging: true,
};

export default config;
