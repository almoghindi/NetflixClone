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
import { kafkaWrapper } from "./kafka-wrapper";

const app: Application = express();
app.use(urlencoded({ extended: true }));
app.use(cors(corsConfiguration()));
app.use(express.json());

const startKafka = async () => {
  try {
    if (!process.env.KAFKA_BROKER) {
      throw new Error("KAFKA_BROKER must be defined");
    }
    if (!process.env.KAFKA_CLIENT_ID) {
      throw new Error("KAFKA_CLIENT_ID must be defined");
    }

    await kafkaWrapper.connect(process.env.KAFKA_CLIENT_ID, [
      process.env.KAFKA_BROKER,
    ]);

  } catch (err) {
    console.error(err);
  }
};

startKafka();

app.use("/api/payment", json(), paymentRouter);
app.use("/api/webhook", raw({ type: "application/json" }), webhookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Payment & TypeScript Server");
});

export default app;
