import { DataSourceOptions } from "typeorm";

import * as dotenv from "dotenv";


dotenv.config();

const config: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DATABASE_PORT),
  username: "postgres",
  password: "pielly16",
  database: "postgres",
  entities: ["src/entities/**/*.ts"],
  synchronize: true,
};

export default config;
