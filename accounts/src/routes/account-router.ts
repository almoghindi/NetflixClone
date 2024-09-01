import { Router } from "express";
import {
  getAllProfiles,
  addFavoriteItemById,
  createProfile,
  getFavoriteItemsById,
  updateProfile,
  deleteProfile,
} from "../controllers/account-controller";
import expressAsyncHandler from "express-async-handler";
const router: Router = Router();

router.post("/create", expressAsyncHandler(createProfile));
router.post("/delete", expressAsyncHandler(deleteProfile));
router.post("/:id/additem", expressAsyncHandler(addFavoriteItemById));
router.get("/all", expressAsyncHandler(getAllProfiles));
router.get("/:id/items", expressAsyncHandler(getFavoriteItemsById));
router.put("/:id/update", expressAsyncHandler(updateProfile));


export default router;
