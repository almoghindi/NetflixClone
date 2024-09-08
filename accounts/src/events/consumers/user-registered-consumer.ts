import {
  BaseConsumer,
  Topics,
  UserRegisteredEvent,
} from "@netflix-adea/common";
import { EachMessagePayload } from "kafkajs";
import Profile from "../../models/profile";
import { randomBytes } from "crypto";

export class UserRegisteredConsumer extends BaseConsumer<UserRegisteredEvent> {
  topic: Topics.UserRegistered = Topics.UserRegistered;
  groupId: string = "user-registered-consumer";

  async onMessage(
    data: UserRegisteredEvent["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const { id } = data;
    const generatedId = randomBytes(6).toString("hex");

    const profile = Profile.build({
      id: generatedId,
      user_id: id,
    });
    await profile.save();
  }
}
