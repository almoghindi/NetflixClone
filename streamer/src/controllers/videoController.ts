import { Request, Response } from 'express';


export class VideoController {
  private static movieUrlMap: Record<string, string> = {
      'The Last Breath': 'https://netflixclonee.s3.amazonaws.com/The_Last_Breath/master.m3u8',

      // Add more movies here...
  };

  static getMovieUrl(req: Request, res: Response) {
      const movieName = req.params.name;
      const url = VideoController.movieUrlMap[movieName];
      
      if (url) {
          res.send( url );
      } else {
          res.status(404).json({ message: 'Movie not found' });
      }
  }
}