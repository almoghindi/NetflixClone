import request from "supertest";
import express, { Request, Response } from "express";
import {
  getTrendingContent,
  getContentTrailers,
  getContentDetails,
  getSimilarContent,
  getContentByCategory,
  getAllContentByCategory,
  getSeasonDetails,
  getContentByGenre,
  getTvShows,
  getByID,
  getTrailer,
  searchContent,
} from "../controllers/contentControler"; // Adjust the path as needed

// Create an Express app for testing
const app = express();
app.get("/trending/:type", getTrendingContent);
app.get("/:type/:id/videos", getContentTrailers);
app.get("/:type/:id", getContentDetails);
app.get("/:type/:id/similar", getSimilarContent);
app.get("/:type/:category", getContentByCategory);
app.get("/trending/all/day", getAllContentByCategory);
app.get("/tv/:id/season/:seasonNumber", getSeasonDetails);
app.get("/discover/movie/with_genres/:id", getContentByGenre);
app.get("/tv/popular", getTvShows);
app.get("/movie/:id/videos", getByID);
app.get("/movie/:movieId/trailer", getTrailer);
app.get("/search/:text", searchContent);

describe("Content Controller", () => {
  it("should return trending content", async () => {
    const type = "movie";
    const response = await request(app).get(`/trending/${type}`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return content trailers", async () => {
    const type = "movie";
    const id = "550";
    const response = await request(app).get(`/${type}/${id}/videos`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return content details", async () => {
    const type = "movie";
    const id = "550";
    const response = await request(app).get(`/${type}/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return similar content", async () => {
    const type = "movie";
    const id = "550";
    const response = await request(app).get(`/${type}/${id}/similar`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return content by category", async () => {
    const type = "movie";
    const category = "popular";
    const response = await request(app).get(`/${type}/${category}`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return all trending content by category", async () => {
    const response = await request(app).get("/trending/all/day");
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return season details", async () => {
    const id = "1399";
    const seasonNumber = "1";
    const response = await request(app).get(`/tv/${id}/season/${seasonNumber}`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return content by genre", async () => {
    const id = "28";
    const response = await request(app).get(
      `/discover/movie/with_genres/${id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return popular TV shows", async () => {
    const response = await request(app).get("/tv/popular");
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });

  it("should return a movie trailer", async () => {
    const id = "550";
    const response = await request(app).get(`/movie/${id}/videos`);
    expect(response.status).toBe(200);
    expect(response.body.trailerUrl).toBeDefined();
  });

  it("should search for content", async () => {
    const text = "Fight Club";
    const response = await request(app).get(`/search/${text}`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBeDefined();
  });
});
