import express, { Request, Response, NextFunction } from "express";
import { customerRouter } from "./routes/customer";

export const router = express.Router()


router.use('/api/customer', customerRouter)
