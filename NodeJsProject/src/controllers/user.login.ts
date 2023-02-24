import { NextFunction, Response, Request } from "express";
import { Individual } from "../entities/individual";

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await Individual.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const isValidPassword = user.comparePassword(password)
    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    return res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
};
