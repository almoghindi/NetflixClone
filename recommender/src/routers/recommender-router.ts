import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import RecommenderController from "../controllers/reccomender-controller";

const router: Router = Router();

router.get(
  "/recommendations/:id",
  expressAsyncHandler(RecommenderController.getRecommendetions)
);
router.post(
  "/add-liked-content",
  expressAsyncHandler(RecommenderController.AddedLikedContent)
);
router.delete(
  "/remove-liked-content",
  expressAsyncHandler(RecommenderController.RemoveLikedContent)
);
router.get(
  "/get-liked-content/:id",
  expressAsyncHandler(RecommenderController.getLikedContent)
);

export default router;
