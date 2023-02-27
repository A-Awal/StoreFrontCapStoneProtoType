import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv  from "dotenv";
import { User } from "../entities/user";
dotenv.config

// middleware to authenticate with JWT
export const authenticateWithJwt = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
