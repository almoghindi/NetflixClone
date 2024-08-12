import express from "express";
import { seedContent } from "./controllers/seedController";
import dotenv from "dotenv";
import mongoose from "mongoose";
import content from "./models/content";
import contentRouter from "./routes/contentRoute";
//For env File
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", contentRouter);

export default app;
