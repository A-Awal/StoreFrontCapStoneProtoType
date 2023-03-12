import express from "express";
import { customerRegistration } from "../controllers/auth/customer.auth";
import { loginHandler } from "../controllers/auth/auth.controller";

export const customerRouter = express.Router();

customerRouter.post("/login", loginHandler);
customerRouter.post("/signup", customerRegistration);
