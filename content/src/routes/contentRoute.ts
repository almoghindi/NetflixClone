import { Router } from "express";
import {
  getAllContents,
  getTop10Content,
  searchContentByName,
} from "../controllers/contentControler";

const router = Router();

const contentRouter = Router();

contentRouter.get("/content", getAllContents);
contentRouter.post("/search", searchContentByName);
contentRouter.get("/top10", getTop10Content);

export default contentRouter;
