import Profile from "../models/profile";
import FavoriteItem from "../models/favorite-item";
import { Request, Response } from "express";

const createProfile = async (req: Request, res: Response) => {
  const profile = await Profile.create(req.body);
  return res.status(201).json(profile);
};

const getAllProfiles = async (req: Request, res: Response) => {
  const profiles = await Profile.findAll({ include: [FavoriteItem] });
  return res.status(200).json(profiles);
};
const getFavoriteItemsById = async (req: Request, res: Response) => {
  const data = { profile_id: req.params.id, ...req.body };
  const fav_item = await FavoriteItem.create(data);
  return res.status(201).json(fav_item);
};
export { getAllProfiles, getFavoriteItemsById, createProfile };
