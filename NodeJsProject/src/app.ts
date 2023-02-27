import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import { initializeDatabase } from "./config/db";
import { router } from "./routes";

const app: Application = express();
const port: number = Number(process.env.PORT);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
    error: err.message,
  });
});

app.listen(port, (): void => {
  initializeDatabase();
  console.log(`App started on port: ${port}  ...`);
});
