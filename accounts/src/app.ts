import express, {
  Express,
  Request,
  Response,
  Application,
  urlencoded,
  json,
} from "express";
import { corsConfiguration } from "./configurations/cors";
import cors from "cors";
import accountRouter from "./routes/account-router";
import errorHandler from "./middlewares/error-handler";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors(corsConfiguration()));

app.use("/api/profile/", accountRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use(errorHandler);

export default app;
