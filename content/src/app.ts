import express from "express";
import dotenv from "dotenv";

import contentRouter from "./routes/contentRoute";
import cors from "cors";
import seedRouter from "./routes/seedRoute";
//For env File
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", contentRouter);
app.use("/api", seedRouter);

export default app;
