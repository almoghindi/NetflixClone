
import mongoose from "mongoose";

enum SubscriptionType {
  BASIC = "BASIC",
  STANDART = "STANDART",
  PREMIUM = "PREMIUM",
  NOT_PAID = "NOT_PAID",
}
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  subscription: {
    type: String,
    enum: Object.values(SubscriptionType),
    required: true,
    default: SubscriptionType.NOT_PAID,
  },
});

export default mongoose.model("User", UserSchema);
