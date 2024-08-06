import express, {
  Express,
  Request,
  Response,
  Application,
  urlencoded,
  json,
} from "express";

import "./database/connection";
import accountRouter from "./routes/account-router";

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/profile/", accountRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
