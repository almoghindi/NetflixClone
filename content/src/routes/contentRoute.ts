import { Router } from "express";
import {
  getAllContents,
  getByID,
  getContentByGenre,
  getMovies,
  getTop10Content,
  getTvShows,
  searchContentByName,
} from "../controllers/contentControler";
import {
  getSimilarContent,
  getTrendingContent,
  getContentByCategory,
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
contentRouter.get("/tvshows", getTvShows);
contentRouter.get("/movies", getMovies);

// new content Routes

contentRouter.get("/trending/all", getAllContentByCategory);
contentRouter.get("/trending/:type", getTrendingContent);
contentRouter.get("/:id/trailers/:type", getContentTrailers);
contentRouter.get("/:id/details/:type", getContentDetails);
contentRouter.get("/:id/similar/:type", getSimilarContent);
contentRouter.get("/:category/:type", getContentByCategory);
contentRouter.get("/genre/:genre", getContentByGenre);
contentRouter.get("/:id", getByID);


// contentRouter.get("/:id/season/:seasonNumber", getSeasonDetails);

export default contentRouter;
