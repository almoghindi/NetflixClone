import DBConnect from "./database/connection";
import app from "./app";

const port = process.env.PORT || 3002;

DBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
});
