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

  async connect(clientId: string, brokers: string[]) {
    this._client = new Kafka({ clientId, brokers });
    this._producer = this._client.producer();
    this._admin = this._client.admin();
    await this._producer.connect();
    await this._admin.connect();
    console.log("Connected to Kafka");

    await this.createTopics(Object.values(Topics));
  }

  private async createTopics(topics: string[]) {
    if (!this._admin) {
      throw new Error("Cannot access Kafka admin before connecting");
    }
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
  }
}

export const kafkaWrapper = new KafkaWrapper();
