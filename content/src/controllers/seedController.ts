import { Request, Response } from "express";
import content from "../models/content";
import { data } from "../data/data";
export const seedContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await content.deleteMany(); // Optional: Clear existing data
    await content.insertMany(data.content);

    res.status(200).send("Data seeded successfully!");
  } catch (err) {
    console.error("Error seeding data:", err);
    res.status(500).send("Error seeding data" + err);
  }
};
