import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/db";
import { Individual } from "../entities/individual";

export const customerRouter = express.Router();

customerRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    const individual = new Individual();
    individual.password = password;
    individual.email = email;
    await AppDataSource.manager.save(individual);

    const users = await AppDataSource.manager.find(Individual);

    res.json(users);
  }
);
