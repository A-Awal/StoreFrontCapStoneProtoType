import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AppDataSource } from "../config/db";
import { Individual } from "../entities/individual";
import {authenticateWithJwt} from '../middlewares/authenticateWithJwt'
import jwt from "jsonwebtoken"
import { userLogin } from "../controllers/user.login";

export const customerRouter = express.Router();

customerRouter.post(
  "/login", userLogin
);

customerRouter.get("/l", (req, res)=>{
  res.json({msg :"Alright"})
});




// customerRouter.get(
//   "/customer", authenticateWithJwt,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const customer = Individual.findOne({where:{email : req.user.email}})
//     res.json()
//   }
//   )

//   customerRouter.post(
//     "/logout",
//     async(req: Request, res: Response, next: NextFunction) => {
//       // Clear the JWT token from the client-side cookie
//       res.clearCookie("token");

//       // End the user's Passport session
//       req.logout()

//       // Redirect the user to the login page or any other desired page
//       res.redirect("/login");
//     }
//   );