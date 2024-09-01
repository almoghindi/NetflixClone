import { Request, Response, NextFunction } from "express";

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

export const getContentByGenre = async (
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

export const getTvShows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?page=2`,
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
    const tvShows = data.results.slice(0, 10);
    res.status(200).json({ content: tvShows });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// export const getByID = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.params;
//   console.log(`${id} - THIS IS THE ID`);

//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${id}/videos`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
//         },
//       }
//     );

//     const data = await response.json();

//     const trailers = data.results.filter(
//       (video: { type: string; site: string }) =>
//         video.type === "Trailer" && video.site === "YouTube"
//     );

//     if (trailers.length > 0) {
//       const trailerUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
//       console.log("Trailer URL:", trailerUrl);

//       // Return the trailer URL and any other relevant data
//       res.status(200).json({ trailerUrl, data: trailers[0] });
//     } else {
//       console.log("No trailer found for this movie.");
//       res.status(404).json({ message: "No trailer found for this movie." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// };

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
