import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import { initializeDatabase } from "./config/db";
import passport from "passport";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";
import { router } from "./routes";
import "./config/passport.config";
import { initswagger } from "./utils/swagger";

async function main() {
  const app = express();
  const port: number = Number(process.env.PORT);

  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: `${process.env.DB_PASSWORD}`,
    port: Number(process.env.DB_PORT),
  });

  const pgSessionStore = pgSession(session);

  app.use(
    session({
      store: new pgSessionStore({
        pool: pool,
        tableName: process.env.SESSION_TABLE_NAME,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 3600000,
      },
    })
  );

  app.use(cors({}));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

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
