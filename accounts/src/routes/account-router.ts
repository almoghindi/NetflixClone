import { Router, Request, Response } from "express";

import Profile from "../models/profile";
import FavoriteItem from "../models/favorite-item";

const router: Router = Router();

router.post("/create", async (req: Request, res: Response) => {
  const profile = await Profile.create(req.body);
  return res.status(201).json(profile);
});
router.post("/:id/favorite-items", async (req: Request, res: Response) => {
  const data = { profile_id: req.params.id, ...req.body };
  const fav_item = await FavoriteItem.create(data);
  return res.status(201).json(fav_item);
});
router.get("/profiles", async (req: Request, res: Response) => {
  const profiles = await Profile.findAll({ include: [FavoriteItem] });
  return res.status(200).json(profiles);
});
export default router;
