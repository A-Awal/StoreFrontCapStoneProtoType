import { Request, Response, NextFunction } from "express";
import { sendMail } from "../utils/mailer";
import { User } from "./../entities/user";

export const supportContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { message } = req.body;
    const user: Partial<User> = req.user;
    const subject = `Storefront I.T. Support Service`;
    const heading = `<p style="font-size: 18px; text-align: left">Mesasage from ${user.business_name},</p> <p style="font-size: 18px; text-align: center">`;

    await sendMail(process.env.IT_SUPPORT_MAIL, subject, message, heading);

    return res.status(200).send({ message: "Message sent succesfully" });
  } catch (err) {
    res.status(500).send({ message: "Error contacting suport services" });
    throw new Error(`Error getting customer order: ${err}`);
  }
};
