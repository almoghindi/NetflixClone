import {
  BaseProducer,
  Topics,
  UserRegisteredEvent,
} from "@netflix-adea/common";
import { Kafka } from "kafkajs";

export class UserRegisteredProducer extends BaseProducer<UserRegisteredEvent> {
  topic: Topics.UserRegistered = Topics.UserRegistered;
  constructor(kafka: Kafka) {
    super(kafka);
  }
}
export { UserRegisteredEvent };
