import { Router } from "express";
import { getAllContents, searchContentByName } from "../controllers/contentControler";



const router = Router();

const contentRouter = Router();

contentRouter.get("/content", getAllContents);
contentRouter.post("/search", searchContentByName)


export default contentRouter