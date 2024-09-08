import router from "../routes/account-router";
import express from "express";
import sinon from "sinon";
import mysql from "mysql2/promise";
import SequelizeMock from "sequelize-mock";
import Profile from "../models/profile"; // Adjust the import as necessary
import FavoriteItem from "../models/favorite-item"; // Adjust the import according to your file structure
import { Attributes, FindOptions, WhereOptions } from "sequelize/types/model";

const AppSetup = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/accounts", router);

  return app;
};

const DBMock = new SequelizeMock();

const mockProfileData = [
  new Profile({
    id: "mockId1",
    user_id: "mockUserId1",
    name: "Mock Name 1",
    avatar: "mockAvatarUrl1",
    isKid: false,
  }),
  new Profile({
    id: "mockId2",
    user_id: "mockUserId2",
    name: "Mock Name 2",
    avatar: "mockAvatarUrl2",
    isKid: true,
  }),
];
Object.setPrototypeOf(mockProfileData, Array.prototype);
// Create mock model
const ProfileMock = DBMock.define("Profile", {
  findAll: () => Promise.resolve(mockProfileData),
  findOne: (options?: FindOptions<Profile>) => {
    const where = options?.where as WhereOptions<Profile> & { id?: string };
    return Promise.resolve(
      mockProfileData.find((profile) => profile.id === where.id)
    );
  },
  create: (data: Profile) => Promise.resolve({ ...data, id: "newId" }), // Mock create
  // Add other methods if needed
});

export { AppSetup, ProfileMock, mockProfileData };
