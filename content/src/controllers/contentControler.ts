import { Request, Response, NextFunction } from "express";
import Content from "../models/content";
import newContent from "../models/new-content";

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

export const getTop10Content = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const content = await Content.find().limit(10);
    console.log(content);

    res.status(200).json(content);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getContentByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract genre from route parameters
    const { genre } = req.params;

    // Ensure genre is provided
    if (!genre) {
      return res.status(400).json({ message: "Genre parameter is required" });
    }

    // Find content by genre
    const content = await Content.find({ genre: genre }).exec();

    // Send response
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract genre from route parameters

    // Find content by genre
    const content = await Content.find({ isSeries: false }).limit(10);

    // Send response
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// new content form tmdb

interface TMDBResponse<T> {
  results: T[];
}

export const getTrendingContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { results }: TMDBResponse<any> = await response.json();
    const randomContent = results[Math.floor(Math.random() * results.length)];
    res.status(200).send({ content: randomContent });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentTrailers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type, id } = req.params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { results }: TMDBResponse<any> = await response.json();
    res.status(200).send({ content: results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type, id } = req.params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSimilarContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type, id } = req.params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1&`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { results }: TMDBResponse<any> = await response.json();
    res.status(200).send({ content: results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type, category } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1&`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Network response was not ok");
    }
    const { results }: TMDBResponse<any> = await response.json();
    res.status(200).send({ content: results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error ddddd" });
  }
};

export const getAllContentByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { results }: TMDBResponse<any> = await response.json();
    res.status(200).send({ content: results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSeasonDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, seasonNumber } = req.params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentByGenreNew = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    console.log(id);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getTrailer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { movieId } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      res.status(response.status).json({ error: "Failed to fetch trailer." });
      return;
    }

    const data = await response.json();

    const trailers = data.results.filter(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailers.length > 0) {
      const trailerUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
      res.status(200).json({ trailerUrl });
    } else {
      res.status(404).json({ message: "No trailer found for this movie." });
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract 'text' from query parameters
  const { text } = req.params;
  console.log(text);

  try {
    const SEARCH_KEY = process.env.SEARCH_KEY;
    if (!SEARCH_KEY) {
      res.status(500).send({ message: "API key is missing" });
      return;
    }

    // Make the API request to TMDB
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?page=1&api_key=${SEARCH_KEY}&query=${text}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Handle non-OK responses from the API
      const errorData = await response.json();
      res
        .status(response.status)
        .send({ message: errorData.status_message || "Error from TMDB API" });
      return;
    }

    const data = await response.json();
    res.status(200).send({ content: data });
  } catch (error) {
    console.error("Error fetching movie data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
