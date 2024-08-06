import { Sequelize } from "sequelize-typescript";
import path from "path";

const modelsPath = path.join(__dirname, "..", "models");
const sequelize: Sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [modelsPath],
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_USERNAME:", process.env.DB_USERNAME);
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_PORT:", process.env.DB_PORT);
    console.error("Unable to connect to the database:", error.message);
    // More detailed error logging can be done here if needed
  });

export default sequelize;
