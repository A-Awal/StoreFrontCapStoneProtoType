import express, { Request, Response, NextFunction } from "express";

import { businessRegistration } from "../controllers/reg_business";

export const businessRouter = express.Router();


businessRouter.post("/register", businessRegistration);

businessRouter.get(
  "/business/verify/:id/:token`",
  businessRegistration
);
