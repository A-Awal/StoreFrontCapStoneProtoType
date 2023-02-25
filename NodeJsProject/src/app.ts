import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { initializeDataBase } from "./config/db";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { router } from "./routes";
import passport from "./config/passport.config";



dotenv.config();

  const app: Application = express();
  const port: number = Number(process.env.PORT);


 
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  app.use(cors());
 

  
 
  app.use(router);
  
  app.listen(port, function (): void {
    initializeDataBase();
    console.log(`App started on port: ${port}  ...`);
  });
  




