import mongoose from "mongoose";

const SubscriptionPayPalSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      orderId: {
        type: String,
      },
      subscription: {
        type: String,
        required: true,
      },
      subscriptionPrice: {
        type: Number,
        required: true,
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

const SubscriptionPayPal = mongoose.model("SubscriptionPayPal", SubscriptionPayPalSchema);

export default SubscriptionPayPal;