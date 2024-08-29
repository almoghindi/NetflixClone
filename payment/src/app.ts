import express, {
  Request,
  Response,
  Application,
  urlencoded,
  raw,
  json,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
//For env File
dotenv.config();

import paymentRouter from "./routes/payment-route";
import webhookRouter from "./routes/webhook-route";

import { corsConfiguration } from "./configurations/cors";

const app: Application = express();
app.use(urlencoded({ extended: true }));
app.use(cors(corsConfiguration()));
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  webhookRouter
);
app.use(express.json());

app.use("/api/payment", json(), paymentRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Payment & TypeScript Server");
});

export default app;
