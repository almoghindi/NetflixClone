import DBConnect from "./database/connection";
import app from "./app";
import { kafkaWrapper } from "./kafka-wrapper";
import { UserRegisteredConsumer } from "./events/consumers/user-registered-consumer";

const port = process.env.PORT || 3002;

const start = async () => {
  if (!process.env.KAFKA_BROKER) {
    throw new Error("KAFKA_BROKER must be defined");
  }
  if (!process.env.KAFKA_CLIENT_ID) {
    throw new Error("KAFKA_CLIENT_ID must be defined");
  }

  try {
    await kafkaWrapper.connect(process.env.KAFKA_CLIENT_ID, [
      process.env.KAFKA_BROKER,
    ]);

    await new UserRegisteredConsumer(kafkaWrapper.client).consume();

    DBConnect().then(() => {
      app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
      });
    });
  } catch (err) {
    console.error(err);
  }
};

start();
