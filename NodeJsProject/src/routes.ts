import express, { Request, Response, NextFunction } from "express";
import { customerRouter } from "./routes/customer";
import { businessRouter } from "./routes/business";

export const router = express.Router()


router.use('/api/customer', customerRouter);
router.use('/api/business', businessRouter);

