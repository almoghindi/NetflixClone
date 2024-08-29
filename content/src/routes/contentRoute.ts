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
} from "../controllers/contentControler";

const router = Router();

const contentRouter = Router();

// new content Routes

contentRouter.get("/trending/all", getAllContentByCategory);
contentRouter.get("/trending/:type", getTrendingContent);
contentRouter.get("/:id/trailers/:type", getContentTrailers);
contentRouter.get("/:id/details/:type", getContentDetails);
contentRouter.get("/:id/similar/:type", getSimilarContent);
contentRouter.get("/search/:text", searchContent);
contentRouter.get("/:category/:type", getContentByCategory);
contentRouter.get("/genre/:genre", getContentByGenre);
contentRouter.get("/:id", getByID);
contentRouter.get("/movies/:movieId/trailer", getTrailer);


export default contentRouter;
