import express, { Request, Response, NextFunction } from "express";
import { customerRouter } from "./routes/customer";
import { businessRouter } from "./routes/business";


export const router = express.Router();

router.use("/api/customer", customerRouter);
router.use("/api/business", businessRouter);

router.all("api/*", (req: Request, res: Response, next: NextFunction) => {
  console.log("404");
  res.status(404).send("Resource not available");
});

