import { DataSource } from "typeorm";
import config from "../ormconfig";

export const AppDataSource : DataSource = new DataSource(config);

export async  function initializeDatabase() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}


