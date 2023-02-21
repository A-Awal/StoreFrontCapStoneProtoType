import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { initializeDataBase } from "./config/db";



import dotenv from "dotenv";
import { customerRouter } from "./routes/customer";

dotenv.config();

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = Number(process.env.PORT);

app.use('/customer', customerRouter)


app.listen(port, function (): void {
  initializeDataBase();
  console.log("App started on port 3000...");
});
