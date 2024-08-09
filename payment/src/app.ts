import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

//For env File
dotenv.config();

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Payment & TypeScript Server");
});

export default app;
