import { NextFunction, Response, Request } from "express";
import { User, UserType } from "../entities/user";
import bcrypt from "bcrypt";
import { validateCustomerReg } from "../utils/validation_schema";

export const customerRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    phone_number,
  } = req.body;
  // console.log(email, password, first_name, last_name, phone_number, confirm_password);

  const { error, value } = validateCustomerReg({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  });

  console.log(value);
  if (error) {
    console.log(error);
    return res.status(404).send(error.details[0].message);
  }

  try {
    let user = await User.findOne({ where: { email: value.email } });

    if (user) {
      return res.status(401).send({ message: "Email already exist, Log in" });
    }

    const isValidPassword = password == confirm_password;

    if (!isValidPassword) {
      return res
        .status(401)
        .send({ message: "Password and confirm password do not match" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.Salt));

    const hashed_password = await bcrypt.hash(password, salt);
    user = User.create({
      first_name,
      last_name,
      email: value.email,
      password: hashed_password,
      role: UserType.customer,
      phone_number,
    });
    await user.save();

    return res.status(200).send({ message: `Registration successful` });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
