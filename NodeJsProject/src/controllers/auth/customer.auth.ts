import { NextFunction, Response, Request } from "express";
import { RegistrationService } from "../../services/register.services";
import { userSchema } from "../../utils/validator";
import { User } from "../../entities/user";
import { CustomerRequestBody } from "../../types/user.types";

export const customerRegistration = async (
  req: Request<{}, {}, CustomerRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  let { first_name, last_name, email, password, confirm_password } = req.body;

  const customerUserSchema = userSchema.omit({
    business_name: true,
    id: true,
    token: true,
  });

  const validUser = await customerUserSchema.safeParseAsync({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  });

  if (validUser.success == false) {
    return res.status(400).send(validUser.error);
  }
  try {
    const {
      data: { first_name, last_name, email, password, confirm_password },
    } = validUser;

    const user: User | undefined = await User.findOne({
      where: { email },
    });

    if (user) {
      return res.status(409).send({
        message:
          "Registration failed, email already exists. Please log in or use another email",
      });
    }

    const isValidPassword = password === confirm_password;

    if (!isValidPassword) {
      return res.status(401).send({
        message: "Password and confirm password do not match",
      });
    }

    const customerRegistration = new RegistrationService();
    const customer = await customerRegistration.createCustomer({
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    });
    customerRegistration.createToken(customer);

    return res.status(201).send({
      message: `Activate your account with the link sent to ${customer.email}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Sorry, something went wrong. Please try again later",
    });
  }
};
