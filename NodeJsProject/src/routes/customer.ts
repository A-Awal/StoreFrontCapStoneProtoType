import express from "express";
import { userLogin } from "../services/login.sevices";
import { customerRegistration } from "../controllers/auth/customer.auth";
import { verifyAccount } from "../controllers/auth/verify_account";
import { setNewPassword } from "../controllers/auth/password_reset";

export const customerRouter = express.Router();

customerRouter.post("/login", userLogin);

customerRouter.post("/register", customerRegistration);

customerRouter.get("/verify/:id:token", verifyAccount);

customerRouter.post("/reset/:id/:token", setNewPassword);
