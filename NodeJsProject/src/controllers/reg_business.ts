import { NextFunction, Response, Request } from "express";
import { User, UserType } from "../entities/user";
import bcrypt from "bcrypt";
import { validateBusinessReg } from "../utils/validation_schema";
import { sendMail, subject } from "../utils/email";
import dotenv from "dotenv";
import { Token } from "../entities/token";
dotenv.config();

export const businessRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { business_name, email, password, confirm_password, phone_number } =
    req.body;
  // console.log(email, password, business_name, phone_number, confirm_password);

  const { error, value } = validateBusinessReg({
    business_name,
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
      business_name,
      email: value.email,
      password: hashed_password,
      role: UserType.business,
      phone_number,
    });
    await user.save();
    const token = await user.generateAuthToken();
    const Usertoken = Token.create({
      id: user.id,
      token,
    });
    await Usertoken.save();

    const message = `${process.env.BASE_URL}/business/verify/${user.id}/${token}`;

    try {
      await sendMail(user.email, subject, message);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
    return res.status(200).send({
      message: `Activate your account with the link sent to ${user.email}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const verifyAccount = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { id: Number(req.params.id) } });
    if (!user) {
      return res.status(400).send("Invalid link");
    }
    const token = await Token.findOne({
      where: { id: user.id, token: req.params.token },
    });
    if (!token) {
      return res.status(400).send("Invalid link");
    }
     
    User.update(user)
    await Token.remove(token)
  } catch (error) {
    res.status(400).send("An error occured");
  }
};
