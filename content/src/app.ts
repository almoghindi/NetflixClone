import express from "express";
import { seedContent } from "./controllers/seedController";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contentRouter from "./routes/contentRoute";
import cors from "cors";
import { corsConfiguration } from "./configurations/cors";
import seedRouter from "./routes/seedRoute";
//For env File
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", contentRouter);
app.use("/api", seedRouter);

export default app;
