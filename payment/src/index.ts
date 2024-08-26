import app from "./app";
import { DBConnect } from "./database/connection";

const port = process.env.PORT || 8000;
DBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
});
