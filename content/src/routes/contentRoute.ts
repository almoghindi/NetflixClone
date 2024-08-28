import { Router } from "express";
import {
  getAllContents,
  getContentByCategory,
  getContentByGenre,
  getMovies,
  getTop10Content,
  getTrailer,
  searchContent,
  searchContentByName,
} from "../controllers/contentControler";
import {
  getSimilarContent,
  getTrendingContent,
  // getContentByCategory,
  getContentDetails,
  getContentTrailers,
  getAllContentByCategory,
} from "../controllers/contentControler";

const router = Router();

const contentRouter = Router();

contentRouter.get("/content", getAllContents);
contentRouter.post("/search", searchContentByName);
contentRouter.get("/top10", getTop10Content);
contentRouter.get("/movies", getMovies);
contentRouter.get("/genre/:genre", getContentByGenre);

// new content Routes

contentRouter.get("/trending/all", getAllContentByCategory);
contentRouter.get("/trending/:type", getTrendingContent);
contentRouter.get("/:id/trailers/:type", getContentTrailers);
contentRouter.get("/:id/details/:type", getContentDetails);
contentRouter.get("/:id/similar/:type", getSimilarContent);
contentRouter.get("/search/:text", searchContent);
contentRouter.get("/:category/:type", getContentByCategory);
contentRouter.get("/genre/:genre", getContentByGenre);
contentRouter.get("/movies/:movieId/trailer", getTrailer);
// contentRouter.get("/:id/season/:seasonNumber", getSeasonDetails);

export default contentRouter;
