import mongoose from "mongoose";

enum SubscriptionType {
  EXPIRED = "EXPIRED",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
}
interface SubscriberAttrs {
  orderId: string;
  stripeId?: string;
  subscription: SubscriptionType;
}

interface SubscriberDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
  subscription: SubscriptionType;
}

interface SubscriberModel extends mongoose.Model<SubscriberDoc> {
  build(attrs: SubscriberAttrs): SubscriberDoc;
}
const SubscriberSchema = new mongoose.Schema(
  {
    stripeId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    subscription: {
      type: String,
      required: true,
      enum: Object.values(SubscriptionType),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
SubscriberSchema.statics.build = (attrs: SubscriberAttrs) => {
  return new Subscriber(attrs);
};

const Subscriber = mongoose.model<SubscriberDoc, SubscriberModel>(
  "Subscriber",
  SubscriberSchema
);
export { Subscriber, SubscriptionType };
