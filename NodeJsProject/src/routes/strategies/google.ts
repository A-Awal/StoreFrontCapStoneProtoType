import express, { NextFunction, Response, Request } from "express";
import passport from "passport";

export const authRouter = express.Router();




function isLoggegIn(req: Request, res: Response, next: NextFunction){
  req.user ? next() : res.send(`YOU FAILED ${req.user}`)
}

authRouter.get("/login/success",isLoggegIn, (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).send({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  }
  res.status(403).send({ error: true, message: " Not Authorised" });
});

authRouter.get("/login/failed", (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).send({
      error: true,
      message: "Log in failure",
    });
  }
});

authRouter.get("/", async (req, res, next) => {
  try {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  } catch (err) {
    // handle the error in some way, such as displaying an error message to the user or logging the error
    console.error(err);
    res.status(500).send("Authentication failed");
  }
});

authRouter.get("/redirect", async (req, res, next) => {
  try {
    passport.authenticate("google", {
      successRedirect: "https://storefrontsmes.amalitech-dev.net",
      failureRedirect: "https://storefrontsmes.amalitech-dev.net",
    })(req, res, next);
  } catch (err) {
    // handle the error in some way, such as displaying an error message to the user or logging the error
    console.error(err);
    res.status(500).send("Authentication failed");
  }
});


authRouter.get(
  "/logout",
  (req : Request, res:Response, next: NextFunction) => {
      req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.redirect('/login')
  })
}
);


