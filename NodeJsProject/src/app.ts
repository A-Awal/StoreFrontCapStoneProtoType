import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import { initializeDatabase } from "./config/db";
import passport from "passport";
import { router } from "./routes";
import "./config/passport.config";
import { initswagger } from "./utils/swagger";

async function main() {
    const app = express();
    const port: number = Number(process.env.PORT);

    app.use(cors({}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());

    app.use(router);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
            return next(err);
        }
        res.status(500).send({
            message: "Internal Server Error",
            error: err.message,
        });
    });
    initswagger(app);
    app.listen(port, function (): void {
        initializeDatabase();
        console.log(`App started on port ${port}...`);
    });
}

main();
