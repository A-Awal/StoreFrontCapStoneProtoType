import express from "express";
import { verifyAccount } from "../controllers/auth/activate_account.controllers";
import { businessRegistration } from "../controllers/auth/merchant.controller";
import passport from "passport";
import {
  requestPasswordReset,
  setNewPassword,
} from "../controllers/auth/password_reset.controller";
import {
  loginHandler,
  logoutHandler,
} from "../controllers/auth/auth.controller.";

export const businessRouter = express.Router();

businessRouter.post("/login", loginHandler);
businessRouter.post("/signup", businessRegistration);
businessRouter.post("/verify", verifyAccount);
businessRouter.post("/reset", requestPasswordReset);
businessRouter.post("/new_password", setNewPassword);
businessRouter.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutHandler
);
