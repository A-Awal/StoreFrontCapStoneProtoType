import { Request, Response, NextFunction } from "express";
import { CustomerOrder } from "../services/order.services";
import { OrdersType } from "../types/order.types";
import { User } from "./../entities/user";

export const customerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const user: Partial<User> = req.user;
    const  order : OrdersType = await new CustomerOrder().getOrders(user)
    return res.send(order);
  } catch (err) {
    res.status(500).send({ message: "Error getting customer order" });
    throw new Error(`Error getting customer order: ${err}`);
  }
};

export const customerOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const user: Partial<User> = req.user;
    const orderDetails = await new CustomerOrder().getOrderDetails(user);

    return res.send(orderDetails);
  } catch (err) {
    res.status(500).send({ message: "Error getting customer order" });
    throw new Error(`Error getting customer order: ${err}`);
  }
};
