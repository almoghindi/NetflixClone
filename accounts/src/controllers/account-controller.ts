import Profile from "../models/profile";
import FavoriteItem from "../models/favorite-item";
import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { convertFavoriteItemToContent } from "../utils/converter";

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
    const profile = await Profile.create({
      id: generatedId,
      user_id,
      name,
      avatar,
      isKid,
    });
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
    const { id } = req.params; // This is now the user_id

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const profiles = await Profile.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: FavoriteItem,
          as: "favoriteItems",
        },
      ],
    });

    if (profiles.length === 0) {
      res.status(404).json({ message: "No profiles found for this user" });
      return;
    }
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllProfiles;

const addFavoriteItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, type } = req.params;
    const { Content } = req.body;

    // Validate that the profile exists before adding an item
    const profile = await Profile.findByPk(id);
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    // Validate the content ID
    if (!Content) {
      res.status(400).json({ message: "Content ID is required" });
      return;
    }

    // Check if the item already exists
    const existingItem = await FavoriteItem.findOne({
      where: {
        profile_id: id,
        content_id: Content.id,
        media_type: type,
      },
    });

    if (existingItem) {
      res.status(409).json({ message: "Favorite item already exists" });
      return;
    }

    // If the item doesn't exist, create it
    const data = {
      profile_id: id,
      content_id: Content.id.toString(), // Ensure content ID is a string
      media_type: Content.media_type, // 'movie' or 'tv'
      adult: Content.adult,
      backdrop_path: Content.backdrop_path,
      original_language: Content.original_language,
      overview: Content.overview,
      poster_path: Content.poster_path,
      genre_ids: Content.genre_ids,
      popularity: Content.popularity,
      vote_average: Content.vote_average,
      vote_count: Content.vote_count,
      ...(Content.media_type === "movie"
        ? {
            original_title: Content.original_title,
            title: Content.title,
            release_date: Content.release_date,
            video: Content.video,
          }
        : {
            name: Content.name,
            original_name: Content.original_name,
            first_air_date: Content.first_air_date,
            origin_country: Content.origin_country,
          }),
    };
    console.log("Data to create:", data);

    const fav_item = await FavoriteItem.create(data);
    res.status(201).json(fav_item);
    console.log("Favorite item added successfully");
  } catch (error) {
    console.error("Error adding favorite item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteFavoriteItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, itemId } = req.params;
    console.log(id, itemId);
    // Find the favorite item by ID
    const fav_item = await FavoriteItem.findOne({
      where: { profile_id: id, content_id: itemId },
    });
    console.log(fav_item);

    if (!fav_item) {
      res.status(404).json({ message: "Favorite item not found" });
      return;
    }

    // Delete the favorite item
    await fav_item.destroy();

    res.status(200).json({ message: "Favorite item deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFavoriteItemsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const favoriteItems: FavoriteItem[] = await FavoriteItem.findAll({
    where: { profile_id: req.params.id },
  });

  const convertedItems = favoriteItems.map(convertFavoriteItemToContent);

  const FavoriteMovies = convertedItems.filter(
    (content) => content.media_type === "movie"
  );
  const FavoriteTvShows = convertedItems.filter(
    (content) => content.media_type === "tv"
  );
  res.status(200).json({ movies: FavoriteMovies, tvShows: FavoriteTvShows });
};
const deleteAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    await FavoriteItem.destroy({ where: {} });
    res.status(200).json({ message: "All items deleted successfully" });
  } catch (error) {
    console.error("Error deleting all items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getAllProfiles,
  addFavoriteItemById,
  createProfile,
  getFavoriteItemsById,
  updateProfile,
  deleteProfile,
  deleteFavoriteItemById,
  deleteAllItems,
};
