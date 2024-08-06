import { Router } from "express";
import {
  getAllProfiles,
  getFavoriteItemsById,
  createProfile,
} from "../controllers/account-controller";

const router: Router = Router();

router.post("/create", createProfile);
router.post("/:id/favorite-items", getFavoriteItemsById);
router.get("/all", getAllProfiles);
export default router;
