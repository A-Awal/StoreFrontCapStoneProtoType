import express, { Request, Response } from "express";
import passport from "passport";

export const facebookRouter = express.Router();

facebookRouter.get("/", passport.authenticate("facebook", { scope: "email" }));

facebookRouter.get("/facebook_redirect", (req: Request, res: Response) => {
    res.status(201).send({message: "log in successful"});
});

facebookRouter.get(
    "/redirect",
    passport.authenticate("facebook", {
        successRedirect: "https://storefrontsmes.amalitech-dev.net/dashboard",
        failureRedirect: "https://storefrontsmes.amalitech-dev.net/login",
    })
);
