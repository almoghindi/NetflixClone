import { connect } from "mongoose";

async function DBConnect() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri)
    throw new Error("MONGO_URI environment variable is not defined");

  try {
    await connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database");
  }
}
export { DBConnect };
