import { Request, Response, NextFunction } from "express";
import { PasswordResetService } from "../../services/password_reset.services";
import {
  validateEmail,
  validateReset,
} from "../../utils/validations/login_schema";

export const sendResetEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  const { email } = req.body;

  const { error, value } = validateEmail({ email });
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  try {
    const sendResetMail = new PasswordResetService();
    await sendResetMail.sendResetEmail(value.email);

    res.status(201).send({
      message: `Password reset link successfully sent to ${value.email}`,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};


export const setNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, confirm_password } = req.body;
  const { id, token } = req.params;
  const { error, value } = validateReset({ password, confirm_password });

  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  try {
    const isValidPassword = password === confirm_password;
    if (!isValidPassword) {
      return res
        .status(401)
        .send({ message: `Password and confirm password do not match` });
    }
    const setPassword = new PasswordResetService();
    setPassword.resetPassword(token, password, Number(id));

    res.status(201).send({
      message: `Password reset successful`,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
