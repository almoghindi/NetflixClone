import { ObjectId } from "mongodb";
import mongoose from "mongoose";

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
        type:String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

export default mongoose.model("User", UserSchema);
