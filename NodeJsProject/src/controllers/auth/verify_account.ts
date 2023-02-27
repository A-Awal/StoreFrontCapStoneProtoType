import  {Request, Response, NextFunction} from "express"
import { User } from "../../entities/user";
import { Token } from "../../entities/token";

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const user = await User.findOne({ where: { id: Number(req.params.id) } });
    if (!user) {
      return res.status(400).send("Invalid link");
    }
    const token = await Token.findOne({
      where: { user_id: user.id, token: req.params.token },
    });
    if (!token) {
      return res.status(400).send("Invalid link");
    }

    await User.update({ id: user.id }, { activated: true });
    await Token.remove(token);

    return res.send("Your account has been successfully activated");
  } catch (error) {
    return res.status(400).send("An error occured");
  }
};
