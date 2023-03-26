import express from "express";
import { loginHandler } from "../controllers/auth/auth.controller.";
import { customerRegistration } from "../controllers/auth/customer.controller";
import passport from "passport";
import { customerOrderDetails, customerOrders } from "./../controllers/order";

export const customerRouter = express.Router();

customerRouter.post("/login", loginHandler);

customerRouter.post("/signup", customerRegistration);

customerRouter.get(
  "/customer-orders",
  passport.authenticate(
    "jwt",

    { session: false }
  ),
  customerOrders
);

customerRouter.get(
  "/customer-order-details",
  passport.authenticate(
    "jwt",

    { session: false }
  ),
  customerOrderDetails
);
