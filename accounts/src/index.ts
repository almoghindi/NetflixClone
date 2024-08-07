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
import DBConnect from "./database/connection";
import accountRouter from "./routes/account-router";
import errorHandler from "./middlewares/error-handler";
// import "express-async-errors";
const app: Application = express();
const port = process.env.PORT || 8000;
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors(corsConfiguration()));

app.use("/api/profile/", accountRouter);
DBConnect();
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
