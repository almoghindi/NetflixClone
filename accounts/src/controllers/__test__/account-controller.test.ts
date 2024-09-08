import request from "supertest";
import sinon from "sinon";
import { AppSetup, mockProfileData, ProfileMock } from "../../test/setup"; // Adjust the import path
import Profile from "../../models/profile";
import FavoriteItem from "../../models/favorite-item";

const app = AppSetup();

const profileCreateStub = sinon.stub(ProfileMock, "create");
const profileFindOneStub = sinon.stub(ProfileMock, "findOne");
const profileFindAllStub = sinon.stub(ProfileMock, "findAll");
const profileDestroyStub = sinon.stub(ProfileMock, "destroy");

afterEach(() => {
  sinon.restore(); // Restore the original methods after each test
});

describe("Account Controller", () => {
  describe("POST /create", () => {
    it("should create a new profile", async () => {
      const mockProfile = new Profile({
        id: "newId",
        user_id: "mockUserId1",
        name: "Mock Name 1",
        avatar: "mockAvatarUrl1",
        isKid: false,
      });

      profileCreateStub.resolves(mockProfile); // Mock the Profile.create method

      const response = await request(app).post("/api/accounts/create").send({
        user_id: "mockUserId1",
        name: "Mock Name 1",
        avatar: "mockAvatarUrl1",
        isKid: false,
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockProfile);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app).post("/api/accounts/create").send({
        user_id: "mockUserId1",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Missing required fields" });
    });
  });

  describe("DELETE /delete", () => {
    it("should delete a profile if found", async () => {
      profileFindOneStub.resolves(mockProfileData[0]); // Mock the Profile.findOne method
      profileDestroyStub.resolves(); // Mock the destroy method

      const response = await request(app)
        .delete("/api/accounts/delete")
        .send({ id: "mockId1" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Profile deleted successfully",
      });
    });

    it("should return 404 if profile is not found", async () => {
      profileFindOneStub.resolves(null); // Mock profile not found

      const response = await request(app)
        .delete("/api/accounts/delete")
        .send({ id: "nonexistentId" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile not found" });
    });
  });

  describe("PUT /update/:id", () => {
    it("should update a profile if found", async () => {
      const updatedProfileData = { name: "Updated Name" };

      profileFindOneStub.resolves(mockProfileData[0]); // Mock the Profile.findOne method
      profileDestroyStub.resolves(); // Mock the save method

      const response = await request(app)
        .put("/api/accounts/update/mockId1")
        .send(updatedProfileData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Updated Name");
    });

    it("should return 404 if profile is not found", async () => {
      profileFindOneStub.resolves(null); // Mock profile not found

      const response = await request(app)
        .put("/api/accounts/update/nonexistentId")
        .send({ name: "Updated Name" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile not found" });
    });
  });

  describe("GET /:id", () => {
    it("should return the profile if found", async () => {
      profileFindOneStub.resolves(mockProfileData[0]); // Mock the Profile.findOne method

      const response = await request(app).get("/api/accounts/mockId1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProfileData[0]);
    });

    it("should return 404 if profile is not found", async () => {
      profileFindOneStub.resolves(null); // Mock profile not found

      const response = await request(app).get("/api/accounts/nonexistentId");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile not found" });
    });
  });

  describe("GET /all/:id", () => {
    it("should return all profiles for a user", async () => {
      profileFindAllStub.resolves(mockProfileData); // Mock the Profile.findAll method

      const response = await request(app).get("/api/accounts/all/mockUserId1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProfileData);
    });

    it("should return 404 if no profiles are found", async () => {
      profileFindAllStub.resolves([]); // Mock no profiles found

      const response = await request(app).get("/api/accounts/all/mockUserId1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "No profiles found for this user",
      });
    });
  });
});
