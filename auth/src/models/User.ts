import { ObjectId } from "mongodb";
import mongoose from "mongoose";

enum SubscriptionType {
  BASIC = "BASIC",
  STANDART = "STANDART",
  PREMIUM = "PREMIUM",
}
const UserSchema = new mongoose.Schema({
  id: {
    type: ObjectId,
    required: true,
  },
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
    required: true,
  },
  subscription: {
    type: SubscriptionType,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
