import { Kafka, Producer, Admin } from "kafkajs";
import { Topics } from "@netflix-adea/common";

class KafkaWrapper {
  private _client?: Kafka;
  private _producer?: Producer;
  private _admin?: Admin;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Kafka client before connecting");
    }
    return this._client;
  }

  get producer() {
    if (!this._producer) {
      throw new Error("Cannot access Kafka producer before connecting");
    }
    return this._producer;
  }

  async connect(
    clientId: string,
    brokers: string[],
    retries = 5,
    retryInterval = 5000
  ) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this._client = new Kafka({
          clientId,
          brokers,
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
        });

        this._producer = this._client.producer();
        this._admin = this._client.admin();

        await this._producer.connect();
        await this._admin.connect();

        console.log("Connected to Kafka");
        await this.createTopics(Object.values(Topics));
        return;
      } catch (error) {
        console.error(
          `Failed to connect to Kafka (attempt ${attempt}/${retries}):`,
          error
        );
        if (attempt === retries) {
          throw new Error("Failed to connect to Kafka after multiple attempts");
        }
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      }
    }
  }

  private async createTopics(topics: string[]) {
    if (!this._admin) {
      throw new Error("Cannot access Kafka admin before connecting");
    }
    try {
      const existingTopics = await this._admin.listTopics();
      const topicsToCreate = topics.filter(
        (topic) => !existingTopics.includes(topic)
      );

      if (topicsToCreate.length > 0) {
        await this._admin.createTopics({
          topics: topicsToCreate.map((topic) => ({ topic })),
          waitForLeaders: true,
        });
        console.log(`Topics created: ${topicsToCreate.join(", ")}`);
      } else {
        console.log("All topics already exist.");
      }
    } catch (error) {
      console.error("Failed to create topics:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this._producer) await this._producer.disconnect();
    if (this._admin) await this._admin.disconnect();
    console.log("Disconnected from Kafka");
  }
}

export const kafkaWrapper = new KafkaWrapper();
