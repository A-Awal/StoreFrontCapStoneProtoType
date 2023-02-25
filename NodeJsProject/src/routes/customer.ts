import express, { Request, Response, NextFunction } from "express";

import { userLogin } from "../controllers/user_login";
import { customerRegistration } from "../controllers/reg_customer";

export const customerRouter = express.Router();

customerRouter.post("/login", userLogin);

customerRouter.post("/register", customerRegistration);
