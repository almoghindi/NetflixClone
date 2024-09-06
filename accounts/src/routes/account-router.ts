import { Router } from "express";
import {
  getAllProfiles,
  addFavoriteItemById,
  createProfile,
  getFavoriteItemsById,
  updateProfile,
  deleteProfile,
  deleteFavoriteItemById,
  deleteAllItems,
  getProfilebyId,
  userHaveProfile,
} from "../controllers/account-controller";
import expressAsyncHandler from "express-async-handler";
const router: Router = Router();

router.post("/create", expressAsyncHandler(createProfile));
router.post("/delete", expressAsyncHandler(deleteProfile));
router.post("/:id/:type/additem", expressAsyncHandler(addFavoriteItemById));
router.get('/:id/has-profile', userHaveProfile);
router.get("/all/:id", expressAsyncHandler(getAllProfiles));
router.get("/:id/profile", expressAsyncHandler(getProfilebyId));
router.get("/:id/items", expressAsyncHandler(getFavoriteItemsById));
router.put("/:id/update", expressAsyncHandler(updateProfile));
router.delete("/:id/item/:itemId", expressAsyncHandler(deleteFavoriteItemById));
router.delete("/deleteall", expressAsyncHandler(deleteAllItems));


export default router;
