import express, { Application, Request, Response } from "express";
import { AppDataSource } from "./config/db";

import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))



const port: number = Number(process.env.PORT);

app.listen(port, function (): void {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  console.log("App started on port 3000...");
});
