import { Request, Response, NextFunction } from "express";
import Content from "../models/content";

export const getAllContents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const content = await Content.find();
    console.log(content);
    res.status(200).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const searchContentByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Extract search terms from query parameters
  const { name, genre } = req.body;

  try {
    if (!name && !genre) {
      res.status(400).json("Please provide at least one character");
      return;
    }
    const results = await Content.find({
      $or: [
        { title: { $regex: `^${name}`, $options: "i" } },
        { genre: { $regex: `^${genre}`, $options: "i" } },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
