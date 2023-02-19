import express, { Application, Request, Response } from "express";

import dotenv from "dotenv";

dotenv.config();
const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port: number = Number(process.env.PORT);

app.listen(port, function (): void {
  console.log("App started on port 3000...");
});
