import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
  return passport.authenticate(
    "local",
    (err: any, user: Express.User, info: { message: any }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send({ message: "Login successful" });
      });
    }
  )(req, res, next);
};

export const logoutHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await new Promise<void>((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.status(200).send("Logout successful");
  } catch (err) {
    console.error("Error logging out:", err);
    res.status(500).send("Internal Server Error");
  }
};
