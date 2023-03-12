import express, { Request, Response } from "express";
import { verifyAccount } from "../controllers/auth/activate_account";
import { businessRegistration } from "../controllers/auth/business.auth";
import {
  requestPasswordReset,
  setNewPassword,
} from "../controllers/auth/password_reset";
import { loginHandler, logoutHandler } from "../controllers/auth/auth.controller";

export const businessRouter = express.Router();

businessRouter.post("/login", loginHandler);
businessRouter.post("/signup", businessRegistration);
businessRouter.post("/verify", verifyAccount);
businessRouter.post("/reset", requestPasswordReset);
businessRouter.post("/new_password", setNewPassword);
businessRouter.post("/logout", logoutHandler);
