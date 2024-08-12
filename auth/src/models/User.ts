import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
});

export default mongoose.model("User", UserSchema);
