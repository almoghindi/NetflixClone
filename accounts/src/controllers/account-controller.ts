import Profile from "../models/profile";
import FavoriteItem from "../models/favorite-item";
import { Request, Response } from "express";
import { randomBytes } from "crypto";

const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Generate a unique ID
    const generatedId = randomBytes(6).toString("hex");

    // Ensure that all required fields are present
    const { user_id, name, avatar, isKid } = req.body;

    if (!user_id || !name || !avatar) {
       res.status(400).json({ message: "Missing required fields" });
    }

    // Create the new profile with the generated ID
    const profile = await Profile.create({ id: generatedId, user_id, name, avatar, isKid });
    console.log("Profile created successfully:", profile);
    
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body; // Assuming the profile ID is sent in the request body

    const profile = await Profile.findOne({
      where: { id },
    });

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    // Delete the profile
    await profile.destroy();

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findOne({
      where: { id: req.params.id },
    });

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    // Update profile with the fields provided in req.body
    Object.assign(profile, req.body);

    // Save the updated profile
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const profiles = await Profile.findAll({ include: [FavoriteItem] });
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllProfiles;

const addFavoriteItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = { profile_id: id, ...req.body };

    console.log(data);
    
    // Validate that the profile exists before adding an item
    const profile = await Profile.findByPk(id);
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
    }

    // Validate the content ID
    if (!req.body.content_id) {
      res.status(400).json({ message: "Content ID is required" });
    }

    console.log("Data to create:", data);

    const fav_item = await FavoriteItem.create(data);
    res.status(201).json(fav_item);
    console.log("Favorite item added successfully");
  } catch (error) {
    console.error("Error adding favorite item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getFavoriteItemsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const FavoriteItems = await FavoriteItem.findAll({
    where: { profile_id: req.params.id },
  });
  console.log(FavoriteItems);
  
  res.status(200).json(FavoriteItems);
};
export {
  getAllProfiles,
  addFavoriteItemById,
  createProfile,
  getFavoriteItemsById,
  updateProfile,
  deleteProfile,
};
