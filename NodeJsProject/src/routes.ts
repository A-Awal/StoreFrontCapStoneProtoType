import express, { Request, Response } from "express";
import { customerRouter } from "./routes/customer";
import { businessRouter } from "./routes/business";
import { googleRouter } from "./routes/strategies/google";
import { facebookRouter } from "./routes/strategies/facebook";

export const router = express.Router();

router.use("/api/customer", customerRouter);
router.use("/api/business", businessRouter);
router.use("/api/auth/google", googleRouter);
router.use("/api/auth/facebook", facebookRouter);

router.all("/api/*", (req: Request, res: Response): void => {
  res.status(404).send("Not Found");
});
