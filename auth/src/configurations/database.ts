import mongoose from "mongoose";

export const DBConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
