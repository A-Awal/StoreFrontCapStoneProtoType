import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/db";
import { Individual } from "../entities/individual";

export const customerRouter = express.Router();

customerRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, phone_number, password, role } =
      req.body;
    const individual = new Individual();
    individual.password = password;
    individual.email = email;
    individual.first_name = first_name;
    individual.last_name = last_name;
    individual.phone_number = phone_number;
    individual.role = role;
    




    
    await AppDataSource.manager.save(individual);

    const users = await AppDataSource.manager.find(Individual);

    res.json(users);
  }
);


customerRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    res.json('Hello World')
  }
  )