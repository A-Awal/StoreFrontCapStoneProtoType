import express, { Request, Response, NextFunction } from "express";
import { customerRouter } from "./routes/customer";
import { businessRouter } from "./routes/business";
import { authRouter } from "./routes/strategies/google";
import { facebookRouter } from "./routes/strategies/facebook";

export const router = express.Router()


router.use('/api/customer', customerRouter);
router.use('/api/business', businessRouter);

router.use("/api/auth/google", authRouter)
router.use("/api/auth/facebook", facebookRouter);

router.get("/api/logout", (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Session destroyed successfully.");
    }
  });

  req.logout((err) => {
    if (err) {
      console.log(err);
      
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("api/customer/login");
  });
});


router.all('api/*', (req:Request, res:Response, next: NextFunction) =>  {
  console.log("404")
  res.status(404).send("Resource not available")
})


