import express from "express";
import { verifyAccount } from "../controllers/auth/verify_account";
import {
  businessRegistration
} from "../controllers/auth/business.auth";
import { requestPasswordReset, setNewPassword } from "../controllers/auth/password_reset";
import { authenticateSession } from "../middlewares/is_auth";

export const businessRouter = express.Router();

businessRouter.get("/signup", businessRegistration);

businessRouter.get("/verify/:id/:token", verifyAccount);

businessRouter.post("/reset/:id/:token", setNewPassword);
