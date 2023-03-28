import express, { Request, Response } from "express";
import { loginHandler } from "../controllers/auth/auth.controller.";
import { customerRegistration } from "../controllers/auth/customer.controller";
import passport from "passport";
import { customerOrderDetails, customerOrders } from "./../controllers/order";
import { User } from "../entities/user";

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

customerRouter.delete(
  "/delete",
  passport.authenticate(
    "jwt",

    { session: false }
  ),
  async (req: Request, res, next) => {
    let user: Partial<User> = req.user;
    const userI = await User.findOne({ where: { id: user.id } });

    User.remove(userI);

    res.status(200).send({message: `User is successfully deleted`})
  }
);
