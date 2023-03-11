import express, { Request, Response, NextFunction } from "express";
import  { Session, SessionData } from "express-session";
import { UserRequestBody } from '../types/user.types'


interface User {
  user: Partial<UserRequestBody>;
}


interface AuthenticatedRequest extends UserRequestBody {
  session: Session & Partial<SessionData> & { user: User };
}


export function authenticateSession(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}
