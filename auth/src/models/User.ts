
import mongoose from "mongoose";

enum SubscriptionType {
  BASIC = "BASIC",
  STANDART = "STANDART",
  PREMIUM = "PREMIUM",
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
  // subscription: {
  //   type: String,
  //   enum: Object.values(SubscriptionType), // Use the enum values for validation
  //   required: true,
  // },
});

export default mongoose.model("User", UserSchema);
