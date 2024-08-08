import { Sequelize } from "sequelize-typescript";
import Profile from "../models/profile";
import FavoriteItem from "../models/favorite-item";
import mysql from "mysql2";

// services.msc MySQL80
const DBConnect = async () => {
  const databaseName = process.env.DB_NAME!;
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${databaseName}\``,
    (error) => {
      if (error) {
        console.error("Error creating database:", error);
        process.exit(1);
      } else {
        console.log("Database created or already exists.");

        const sequelize = new Sequelize(
          databaseName,
          process.env.DB_USERNAME!,
          process.env.DB_PASSWORD!,
          {
            dialect: "mysql",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            models: [Profile, FavoriteItem],
            logging: false,
          }
        );

        sequelize
          .sync({ force: false, alter: true })
          .then(() => {
            console.log("Database & tables created!");
          })
          .catch((error) => {
            console.error("Error creating database or tables:", error);
            process.exit(1);
          });
      }
    }
  );
};
export default DBConnect;
