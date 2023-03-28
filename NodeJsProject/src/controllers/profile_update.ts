import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user";
import { profileUpdate } from "../types/user.types";
import { userSchema } from "../utils/validator";

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  const { business_name, email, phone_number }: profileUpdate = req.body;

  const profileUpdateSchhema = userSchema.pick({
    business_name: true,
    email: true,
    phone_number: true,
  });

  const validUser = await profileUpdateSchhema.safeParseAsync({
    business_name,
    email,
    phone_number,
  });

  if (validUser.success == false) {
    return res.status(400).send(validUser.error);
  }
  try {
    const {
      data: { business_name, email, phone_number },
    } = validUser;

    let user: Partial<User> = req.user;
    User.update({ id: user.id }, { business_name, email, phone_number });

    return res
      .status(201)
      .send({ message: "Your profile has been succesfully updated" });
  } catch (err) {
    res.status(500).send({ message: "Error updating your profile" });
    throw new Error(`Error updating user profile: ${err}`);
  }
};
