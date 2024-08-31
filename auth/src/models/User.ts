import mongoose from "mongoose";

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
    required: true,
    default: "NOT_PAID",
  },
});

export default mongoose.model("User", UserSchema);
