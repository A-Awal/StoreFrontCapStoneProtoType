import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/user";
import { Token } from "../../entities/token";

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { id, token } = req.params;
  try {
    const user = await User.findOne({ where: { id: Number(id) } });
    if (!user) {
      return res.status(400).send("Invalid link");
    }
    const userToken = await Token.findOne({
      where: { user_id: user.id, token },
    });
    if (!userToken) {
      return res.status(400).send("Invalid link");
    }

    await User.update({ id: user.id }, { activated: true });
    await Token.remove(userToken);

    return res.send("Your account has been successfully activated");
  } catch (error) {
    return res.status(400).send("An error occurred while trying to activate your account. Please try again later");
  }
};
