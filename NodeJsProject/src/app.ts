import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from 'type-graphql';
import { initializeDatabase } from "./config/db";
import pgSession from "connect-pg-simple";
import session from "express-session";


import { Pool } from "pg";

import "./config/passport.config";
import { Console } from "console";

async function main() 
{
  const schema = await buildSchema({
    resolvers: [__dirname + "/controllers/auth/**/*.ts"]
  });

  const apolloServer = new ApolloServer({
  schema,
  context: ({req, res}: any) => ({req, res}),

  });

  const app = express();

  await apolloServer.start();

  app.use((req:Request, res:Response, next:NextFunction) => {
    console.log("Hello!!!!!!");
    next();
    console.log("Got it!!!!");
  })
  apolloServer.applyMiddleware({app});

  app.listen(7000, (): void => {
    initializeDatabase();
    console.log(`App started on port: ${7000}  ...`);
  });
  
}

main();


// import { config } from "dotenv";
// config();

// import express, { Application, Request, Response, NextFunction } from "express";
// import compression from "compression";
// import cors, { CorsOptions } from "cors";
// import { initializeDatabase } from "./config/db";
// import { router } from "./routes";
// import passport from "passport";
// import session from "express-session";
// import pgSession from "connect-pg-simple";
// import { Pool } from "pg";
// const helmet = require("helmet");
// import "./config/passport.config";

// async function main() {}
// {
//   const app: Application = express();
//   const port: number = Number(process.env.PORT);

//   const pool = new Pool({
//     user: process.env.DB_USER,
//     host: "localhost",
//     database: process.env.DB_NAME,
//     password: `${process.env.DB_PASSWORD}`,
//     port: Number(process.env.DB_PORT),
//   });

//   const pgSessionStore = pgSession(session);

//   const sessionLifespan = 30 * 24 * 60 * 60;


//   app.use(
//     session({
//       store: new pgSessionStore({
//         pool: pool,
//         tableName: "user_sessions",
//         createTableIfMissing: true,

//       }),
//       secret: process.env.SESSION_SECRET!,
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         secure: true,
//         httpOnly: true,
//         maxAge : sessionLifespan,
//       },
//     })
//   );

//   // app.use(helmet());
//   app.use(compression());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(cors());
//   app.use(passport.initialize());
//   app.use(passport.session());

//   app.use("/",router);

//   try {
//     app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//       console.error(err.stack);
//       res.status(500).send({
//         message: "Internal Server Error",
//         error: err.message,
//       });
//     });

//     app.listen(port, (): void => {
//       initializeDatabase();
//       console.log(`App started on port: ${port}  ...`);
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// main();
