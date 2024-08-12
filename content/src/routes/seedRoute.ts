import { Router } from "express";
import { seedContent } from "../controllers/seedController";

const seedRouter = Router();

seedRouter.get("/seed", seedContent);

export default seedRouter;
