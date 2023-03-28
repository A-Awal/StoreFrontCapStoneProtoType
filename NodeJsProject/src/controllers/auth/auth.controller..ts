import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../../entities/user";
import { generateAuthToken } from "../../utils/jwt";
import { loginUser } from './../../types/user.types';

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, {message: string, token: string, user:loginUser}>> => {
  return passport.authenticate(
    "local",
    { session: false },
    async (err: any, user: User, info: { message: any }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ message: info.message });
      }

      const { rememberme } = req.body;
      const token = await generateAuthToken(
        {
          id: user.id,
        },
        !!rememberme
      );
       res.status(200).send({
        message: "Login successful",
        success: true,
        user: {
          id: user.id,
          role: user.role,
          email: user.email,
          username:
            user.business_name || `${user.first_name} ${user.last_name}`,
        },
        token: `Bearer ${token}`,
      });
    }
  )(req, res, next);
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.cookie("jwt_token", "", {
      expires: new Date(0),
      secure: true,
      httpOnly: true,
    });

    await Promise.resolve();

    res.status(200).send("Logout successful");
  } catch (err) {
    console.error("Error logging out:", err);
    res.status(500).send("Internal Server Error");
  }
};
