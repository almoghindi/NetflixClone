import { Router } from "express";
import {
  getAllContentByCategory,
  getTrendingContent,
  getContentTrailers,
  getContentDetails,
  getSimilarContent,
  searchContent,
  getContentByCategory,
  getContentByGenre,
  getByID,
  getTrailer,
  getTvShows,
} from "../controllers/contentControler";

const router = Router();

const contentRouter = Router();


contentRouter.get("/trending/all", getAllContentByCategory);
contentRouter.get("/tvshows", getTvShows);
contentRouter.get("/mylist/:id/:type", getByID)
contentRouter.get("/trending/:type", getTrendingContent);
contentRouter.get("/:id/trailers/:type", getContentTrailers);
contentRouter.get("/:id/details/:type", getContentDetails);
contentRouter.get("/:id/similar/:type", getSimilarContent);
contentRouter.get("/search/:text", searchContent);
contentRouter.get("/:category/:type", getContentByCategory);
contentRouter.get("/genre/:genre", getContentByGenre);
contentRouter.get("/movies/:movieId/trailer", getTrailer);
contentRouter.get("/tvshows", getTvShows);
//contentRouter.get("/:id", getByID);

export default contentRouter;
