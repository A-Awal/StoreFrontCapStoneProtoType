import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { initializeDataBase } from "./config/db";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import { ApolloServer } from "apollo-server-express";
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'

import dotenv from "dotenv";
import { router } from "./route";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/users";

dotenv.config();

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false
    }),
    plugins : [ApolloServerPluginLandingPageGraphQLPlayground()]
  })

  await apolloServer.start()
  const app: Application = express();
  const port: number = Number(process.env.PORT);

  apolloServer.applyMiddleware({app, })
  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  
  app.use(router);
  
  app.listen(port, function (): void {
    initializeDataBase();
    console.log(`App started on port: ${port}  ...`);
  });
  
}



main().catch((err)=>{ console.log(err)})