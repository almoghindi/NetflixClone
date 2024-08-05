import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: ObjectId,
    email: String,
    password: String
});

export default mongoose.model("User", UserSchema);
