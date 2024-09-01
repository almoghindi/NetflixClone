import express from "express";
import dotenv from "dotenv";
import { corsConfiguration } from "./configurations/cors";
import cors from "cors";
import { DBConnect } from "./configurations/database";
import authRoutes from "./routes/auth-routes";
import errorHandler from "./middleware/error-handler";
import { kafkaWrapper } from "./kafka-wrapper";
import { ChangeSubscriptionConsumer } from "./events/consumers/change-subscription-consumer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors(corsConfiguration()));

DBConnect();

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

    await new ChangeSubscriptionConsumer(kafkaWrapper.client).consume();
  } catch (err) {
    console.error(err);
  }
};

startKafka();

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is on Fire at http://localhost:${port}`);
});
