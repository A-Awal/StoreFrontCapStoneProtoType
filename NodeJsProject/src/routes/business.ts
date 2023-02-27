import express from "express";
import { verifyAccount } from "../controllers/auth/verify_account";
import {
  businessRegistration,
} from "../controllers/auth/business.auth";
import { sendResetEmail, setNewPassword } from "../controllers/auth/password_reset";

export const businessRouter = express.Router();

businessRouter.post("/register", businessRegistration);

businessRouter.get("/verify/:id/:token", verifyAccount);

businessRouter.post("/reset/:id/:token", setNewPassword);
