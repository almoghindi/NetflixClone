import {
  BaseConsumer,
  Topics,
  UserRegisteredEvent,
} from "@netflix-adea/common";
import { EachMessagePayload } from "kafkajs";
import Profile from "../../models/profile";

export class UserRegisteredConsumer extends BaseConsumer<UserRegisteredEvent> {
  topic: Topics.UserRegistered = Topics.UserRegistered;
  groupId: string = "user-registered-consumer";

  async onMessage(
    data: UserRegisteredEvent["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const { id } = data;
    const profile = Profile.build({
      user_id: id,
    });
    await profile.save();
  }
}
