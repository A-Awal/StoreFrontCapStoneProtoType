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
import { supportContact } from "../controllers/support";
import { updateProfile } from "../controllers/profile_update";

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
businessRouter.post(
  "/support",
  passport.authenticate("jwt", { session: false }),
  supportContact
);
businessRouter.post(
  "/profile-update",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);
