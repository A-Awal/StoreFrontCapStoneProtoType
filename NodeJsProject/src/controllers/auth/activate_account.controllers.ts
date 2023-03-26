import { Request, Response, NextFunction } from "express";
import { userSchema } from "../../utils/validator";
import { RegistrationService } from "../../services/register.services";

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { token } = req.body;
  const tokenSchema = userSchema.pick({ token: true });

  const validUser = await tokenSchema.safeParseAsync({ token });
  if (validUser.success === false) {
    return res.status(404).send({ message: validUser.error });
  }
  try {
    const {
      data: { token },
    } = validUser;
    const verifyUser = await new RegistrationService().verifyAccount(token);

    return res.status(Number(verifyUser.status)).send({
      message: verifyUser.message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message:
        "An error occurred while activating your account. Please try again later.",
    });
  }
};
