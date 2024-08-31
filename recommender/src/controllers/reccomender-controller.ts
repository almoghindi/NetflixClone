import { LikedContent } from "../models/liked-content";
import { Request, Response } from "express";

export class RecommenderController {
  static async AddedLikedContent(req: Request, res: Response) {
    const { Content, userId } = req.body;
    const likedContent = LikedContent.build({
      userId: userId,
      contentData: Content,
    });
    await likedContent.save();
    res.send(likedContent);
  }
}
