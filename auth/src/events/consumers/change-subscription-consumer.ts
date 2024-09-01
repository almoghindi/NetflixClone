import {
  BaseConsumer,
  Topics,
  ChangeSubscriptionEvent,
} from "@netflix-adea/common";

import { EachMessagePayload } from "kafkajs";
import User from "../../models/User";

export class ChangeSubscriptionConsumer extends BaseConsumer<ChangeSubscriptionEvent> {
  topic: Topics.ChangeSubscription = Topics.ChangeSubscription;
  groupId: string = "change-subscription-consumer";

  async onMessage(
    data: ChangeSubscriptionEvent["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const { id, subscription } = data;
    const user = await User.findById(id);
    if (user) {
      user.subscription = subscription;
      await user.save();
    }
  }
}
