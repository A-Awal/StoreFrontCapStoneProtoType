import { NextFunction, Response, Request } from "express";
import { UserRequestBody } from "../../types/user.types";
import { RegistrationService } from "../../services/register.services";
import { validateCustomerReg } from "../../utils/validations/customer";
import { User } from "../../entities/user";

export const customerRegistration = async (
  req: Request<{}, {}, Partial<UserRequestBody>>,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  let { first_name, last_name, email, password, confirm_password } = req.body;

  const { error, value } = validateCustomerReg({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    
    console.log(email, value.email);
    const user = await User.findOne({ where: { email: value.email } });

    if (user) {
      return res.status(401).send({ message: "Email already exists, Log in" });
    }

    const isValidPassword = password === confirm_password;

    if (!isValidPassword) {
      return res
        .status(401)
        .send({ message: "Password and confirm password do not match" });
    }
    console.log(email, value.email)
    const customerRegistration = new RegistrationService();
    const customer = await customerRegistration.createCustomer({
      first_name,
      last_name,
      email: value.email,
      password,
     
    });
     customerRegistration.createToken(customer);

    return res.status(200).send({
      message: `Activate your account with the link sent to ${customer.email}`
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: "Error creating customer" });
  }
};
