import { NextFunction, Response, Request } from "express";
import { User } from "../entities/user";
import { validateLogin } from "../utils/validations/login_schema";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  const { email, password } = req.body;
  console.log(email, password);

  const { error, value } = validateLogin({ email, password });

  console.log(value);
  if (error) {
    console.log(error);
    return res.status(404).send({ message: error.details[0].message });
  }

  try {
    const user: User | null = await User.findOne({
      where: { email: value.email },
    });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const isValidPassword: boolean = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    return res.status(200).send({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
