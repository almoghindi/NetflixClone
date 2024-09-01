import express, { Request, Response, Application, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
//For env File
dotenv.config();
import { corsConfiguration } from "./configurations/cors";
import recommenderRouter from "./routers/recommender-router";

const app: Application = express();
app.use(urlencoded({ extended: true }));
app.use(cors(corsConfiguration()));
app.use(express.json());
app.use("/api", recommenderRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Recommender & TypeScript Server");
});

export default app;
