import express from "express";
import { userLogin } from "../controllers/auth/login.sevices";
import { customerRegistration } from "../controllers/auth/customer.auth";
import { verifyAccount } from "../controllers/auth/verify_account";
import { setNewPassword } from "../controllers/auth/password_reset";

export const customerRouter = express.Router();

customerRouter.post("/login", userLogin);

customerRouter.post("/signup", customerRegistration);

customerRouter.post("/verify/:id:token", verifyAccount);

customerRouter.post("/reset_password/:id/:token", setNewPassword);
