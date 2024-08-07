import Profile from "../models/profile";
import FavoriteItem from "../models/favorite-item";
import { Request, Response } from "express";

const createProfile = async (req: Request, res: Response): Promise<void> => {
  const profile = await Profile.create(req.body);
  res.status(201).json(profile);
};
const updateProfile = async (req: Request, res: Response): Promise<void> => {
  let profile = await Profile.findOne({
    where: { id: req.params.id },
  });
  if (!profile) {
    res.status(404).json({ message: "Profile not found" });
    return;
  }
  // Update profile with the fields provided in req.body
  profile = Object.assign(profile, req.body);

  // Save the updated profile
  await profile!.save();
  res.status(200).json(profile);
};
const addFavoriteItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = { profile_id: req.params.id, ...req.body };
  const fav_item = await FavoriteItem.create(data);
  res.status(201).json(fav_item);
};

const getAllProfiles = async (req: Request, res: Response): Promise<void> => {
  const profiles = await Profile.findAll({ include: [FavoriteItem] });
  res.status(200).json(profiles);
};

const getFavoriteItemsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const FavoriteItems = await FavoriteItem.findAll({
    where: { profile_id: req.params.id },
  });
  res.status(200).json(FavoriteItems);
};
export {
  getAllProfiles,
  addFavoriteItemById,
  createProfile,
  getFavoriteItemsById,
  updateProfile,
};
