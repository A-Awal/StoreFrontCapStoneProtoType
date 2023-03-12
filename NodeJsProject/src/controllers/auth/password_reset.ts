import { Request, Response, NextFunction } from "express";
import { PasswordResetService } from "../../services/password_reset.services";
import { userSchema } from "../../utils/validator";

export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  const { email } = req.body;

  const emailSchema = userSchema.pick({ email: true });
  const validUser = await emailSchema.safeParseAsync({ email });
  if (validUser.success === false) {
    return res.status(400).send(validUser.error);
  }
  try {
    const {
      data: { email },
    } = validUser;
    const passwordResetService =
      await new PasswordResetService().sendResetEmail(email);

    res.status(passwordResetService.status).send({
      message: passwordResetService.message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Password reset unsuccessful" });
  }
};

export const setNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  const { password, confirm_password, token } = req.body;

  const passwordSchema = userSchema.pick({
    password: true,
    confirm_password: true,
    token: true,
  });

  const validUser = await passwordSchema.safeParseAsync({
    password,
    confirm_password,
    token,
  });

  if (validUser.success === false) {
    return res.status(400).send(validUser.error);
  }
  try {
    const {
      data: { password, confirm_password, token },
    } = validUser;
    const isValidPassword = password === confirm_password;
    if (!isValidPassword) {
      return res.status(400).send({
        message: `Password and confirm password do not match. Please ensure both fields contain the same value.`,
      });
    }
    const passwordResetService = await new PasswordResetService().resetPassword(
      password,
      token
    );

    res.status(passwordResetService.status).send({
      message: passwordResetService.message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "Sorry, something went wrong while resetting your password. Please try again later.",
    });
  }
};
