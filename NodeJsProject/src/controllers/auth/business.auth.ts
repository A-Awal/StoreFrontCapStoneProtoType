import { NextFunction, Response, Request } from "express";
import { User, UserType } from "../../entities/user";
import { validateBusinessReg } from "../../utils/validations/business";
import { BusinessRegistrationRequestBody } from "../../types/business.types";
import { RegistrationService } from "../../services/register.services";

export const businessRegistration = async (
  req: Request<{}, {}, BusinessRegistrationRequestBody>,
  res: Response<{ message: string }>,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  const { business_name, email, password, confirm_password } = req.body;

  const { error, value } = validateBusinessReg({
    business_name,
    email,
    password,
    confirm_password,
  });

  if (error) {
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
    const businessRegistration = new RegistrationService();
    const business = await businessRegistration.createbusiness({
      business_name,
      email : value.email,
      password,
      confirm_password,
    });

    businessRegistration.createToken(business);

    return res.status(200).send({
      message: `Activate your account with the link sent to ${business.email}`,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
