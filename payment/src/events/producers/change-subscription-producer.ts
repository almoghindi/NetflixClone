import {
  Topics,
  BaseProducer,
  ChangeSubscriptionEvent,
} from "@netflix-adea/common";
import { Kafka } from "kafkajs";

export class ChangeSubscriptionProducer extends BaseProducer<ChangeSubscriptionEvent> {
  topic: Topics.ChangeSubscription = Topics.ChangeSubscription;
  constructor(kafka: Kafka) {
    super(kafka);
  }
}
export { ChangeSubscriptionEvent };
