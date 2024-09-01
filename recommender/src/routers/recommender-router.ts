import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import RecommenderController from "../controllers/reccomender-controller";

const router: Router = Router();

router.get(
  "/recommendations",
  expressAsyncHandler(RecommenderController.getRecommendetions)
);
router.post(
  "/add-liked-content",
  expressAsyncHandler(RecommenderController.AddedLikedContent)
);

export default router;
