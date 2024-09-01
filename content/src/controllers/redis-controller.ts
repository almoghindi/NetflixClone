import { Request, Response } from "express";
import { redisClient } from "../configurations/redis";
import { fetch } from "../utils/fetch-from-TMDB";

interface TMDBResponse<T> {
  results: T[];
}

const getCachedOrFetch = async (key: string, fetchFunction: () => Promise<any>) => {
  const redisClientInstance = await redisClient;

  try {
    const cachedData = await redisClientInstance.get(key);

    if (cachedData && cachedData.trim() !== "") {
      return JSON.parse(cachedData);
    }

    const newData = await fetchFunction();

    if (newData && JSON.stringify(newData).trim() !== "") {
      await redisClientInstance.set(key, JSON.stringify(newData), {
        EX: 3600, // Cache for 1 hour
      });
    }

    return newData;
  } catch (error) {
    console.error("Error in getCachedOrFetch:", error);
    throw error;
  }
};

export const getTrendingContent = async (req: Request, res: Response): Promise<void> => {
  const { type } = req.params;
  const cacheKey = `trending:${type}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/trending/${type}/day?language=en-US`));
    const { results }: TMDBResponse<any> = data;

    const randomContent = results[Math.floor(Math.random() * results.length)];
    res.status(200).send({ content: randomContent });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentTrailers = async (req: Request, res: Response): Promise<void> => {
  const { type, id } = req.params;
  const cacheKey = `trailers:${type}:${id}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/${type}/${id}/videos?language=en-US`));
    if (type == 'tv'){
      res.status(200).send({ content: data });
    }
    else{
      res.status(200).send({ content: data.results });
    }
  } catch (error) {

    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentDetails = async (req: Request, res: Response): Promise<void> => {
  const { type, id } = req.params;
  const cacheKey = `details:${type}:${id}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/${type}/${id}?language=en-US`));
    res.status(200).send({ content: data });
  } catch (error) {

    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSimilarContent = async (req: Request, res: Response): Promise<void> => {
  const { type, id } = req.params;
  const cacheKey = `similar:${type}:${id}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/${type}/${id}/similar?language=en-US&page=1`));
    res.status(200).send({ content: data.results });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const searchContent = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.params;
  const cacheKey = `search:${text}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/search/movie?page=1&query=${text}`));
    res.status(200).send({ content: data });
  } catch (error) {
    console.error("Error fetching movie data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getTreiler = async (req: Request, res: Response): Promise<void> => {
  const { type,id } = req.params;
  const cacheKey = `treiler:${type}:${id}`;


  try {
    const data = await getCachedOrFetch(cacheKey, async () => {
      const videos = await fetch(`/${type}/${id}/videos`);
      console.log( "videos",videos);
      
      const trailer = videos.results.find((video: any) => video.type === "Trailer");

      if (!trailer) {
        throw new Error("No trailer found for this movie");
      }

      return trailer;
    });

    res.status(200).json({ content: data });
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getContentByCategory = async (req: Request, res: Response): Promise<void> => {
  const { type, category } = req.params;
  const cacheKey = `content:${type}:${category}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/${type}/${category}?language=en-US&page=1`));
    res.status(200).json({ content: data });
  } catch (error) {
    console.error("Error fetching content by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const TrendingAllMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cacheKey = `Trending:all`;

  try {
    // Fetch data or get from cache
    const response: TMDBResponse<any> = await getCachedOrFetch(cacheKey, () =>
      fetch(`/trending/all/day?language=en-US`)
    );

    // Send the response
    res.status(200).send({ content: response.results });
  } catch (error) {
    console.error("Error in TrendingAllMovies:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const TrendingAllTv = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cacheKey = `Trending:TV`;

  try {
    // Fetch data or get from cache
    const response: TMDBResponse<any> = await getCachedOrFetch(cacheKey, () =>
      fetch(`/trending/tv/day?language=en-US`)
    );

    // Send the response
    res.status(200).send({ content: response.results });
  } catch (error) {
    console.error("Error in TrendingAllMovies:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
//tv-shows

export const getTvShows = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cacheKey = `tv:popular`;

  try {
    // Fetch data or get from cache
    const response: TMDBResponse<any> = await getCachedOrFetch(cacheKey, () => fetch(`/tv/popular?page=1`));

    if (response && Array.isArray(response.results)) {
      const tvShows = response.results.slice(0, 15);
      res.status(200).send({ content: tvShows });
    } else {
      res.status(404).send({ message: "TV Shows not found" });
    }
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};



export const getTvShowDetails = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const cacheKey = `tv:details:${id}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/tv/${id}?language=en-US`));
    res.status(200).send({ content: data });
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getTvShowVideos = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const cacheKey = `tv:videos:${id}`;

  try {
    const data = await getCachedOrFetch(cacheKey, () => fetch(`/tv/${id}/videos?language=en-US`));
    res.status(200).send({ content: data });
  } catch (error) {
    console.error("Error fetching TV show videos:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};