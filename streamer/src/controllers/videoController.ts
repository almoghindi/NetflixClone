import { Request, Response } from 'express';
import { processVideoFromS3 } from '../utils/ffmpegProcessor';
import fs from 'fs';
import path from 'path';

export const processVideo = async (req: Request, res: Response) => {
  const { movieName } = req.body;
  const bucketName = 'netflixclonee'; // You might want to store this in an environment variable

  try {
    await processVideoFromS3(bucketName, movieName);
    res.status(200).json({ message: 'Video processed successfully' });
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ error: 'Error processing video' });
  }
};

export const streamVideo = (req: Request, res: Response) => {
  const { movieName } = req.params;
  const filePath = path.join(__dirname, `../../video/${movieName}/output.m3u8`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Video not found');
  }
};