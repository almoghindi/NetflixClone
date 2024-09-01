import {
  LikedContent,
  MovieContent,
  TVShowContent,
} from "../models/liked-content";
import { Request, Response } from "express";
import Groq from "groq-sdk";

interface TMDBResponse<T> {
  results: T[];
}
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default class RecommenderController {
  static async AddedLikedContent(req: Request, res: Response) {
    const { Content, userId } = req.body;
    const likedContent = LikedContent.build({
      userId: userId,
      contentData: Content,
      contentType: Content.title ? "Movie" : "TvShow",
    });

    await likedContent.save();

    res.send(likedContent);
  }
  static async getRecommendetions(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      console.log("userId:" + userId);
      const LikedItems = await LikedContent.find({ userId: userId })
        .sort({ createdAt: -1 })
        .limit(10);
      const MoviesPageresponse = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );
      if (!MoviesPageresponse.ok) {
        throw new Error("Network response was not ok");
      }
      const MoviesPage: TMDBResponse<MovieContent> =
        await MoviesPageresponse.json();
      const Movies = MoviesPage.results;
      const TvShowPageresponse = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );
      if (!TvShowPageresponse.ok) {
        throw new Error("Network response was not ok");
      }
      const TvShowPage: TMDBResponse<TVShowContent> =
        await TvShowPageresponse.json();

      const TvShows = TvShowPage.results;
      const prompt = `
      Based on the following list of Movies and TV Shows, along with the user's last 10 liked items, recommend a total of exactly 10 unique items. The recommendations should be personalized based on the user's preferences and must ensure that no movie or TV show is repeated.

      ### Available Movies:
      ${Movies.map(
        (movie, index) =>
          `${index + 1}. ID: ${movie.id}, Title: ${
            movie.title
          }, Release Date: ${
            movie.release_date
          }, Genres: ${movie.genre_ids.join(", ")}, Rating: ${
            movie.vote_average
          }, Overview: ${movie.overview}`
      ).join("\n")}

      ### Available TV Shows:
      ${TvShows.map(
        (tvShow, index) =>
          `${index + 1}. ID: ${tvShow.id}, Name: ${
            tvShow.name
          }, First Air Date: ${
            tvShow.first_air_date
          }, Genres: ${tvShow.genre_ids.join(", ")}, Rating: ${
            tvShow.vote_average
          }, Overview: ${tvShow.overview}`
      ).join("\n")}

      ### User's Last 10 Liked Items:
      ${LikedItems.map((likedItem, index) => {
        const mediaType = likedItem.contentType;
        const content = likedItem.contentData;
        const name =
          mediaType === "Movie"
            ? (content as MovieContent).title
            : (content as TVShowContent).name;

        const id = content.id;

        return `${index + 1}: ${name} (${mediaType}, ID: ${id})`;
      }).join("\n")}

      ### Instructions:
      1. Analyze the user's liked items to understand their preferences in terms of genres, ratings, and types of content (movies vs. TV shows).
      2. Based on these preferences, select exactly 10 unique items from the combined list of Movies and TV Shows.
      3. Ensure a mix of both movies and TV shows in your recommendations.
      4. Do not include any items that are in the user's list of liked items.
      5. **Use only the IDs and Titles/Names exactly as provided in the available Movies and TV Shows lists. Do not create or generate new IDs or Titles/Names.**
      6. **Ensure that you return exactly 10 items. If there are not enough items to choose from, you must still return 10 items, even if some items are less relevant.**
      7. Format your response as a numbered list from 1 to 10, each line containing only the ID and Title/Name of the recommended item.
      8. Double-check that your list contains exactly 10 items before submitting.
      9. **Use only the IDs and Titles/Names exactly as provided to you without any modifications.**

      Your response should look like this:
      1. ID: [number], Title/Name: [string]
      2. ID: [number], Title/Name: [string]
      ...
      10. ID: [number], Title/Name: [string]

      Provide only this list in your response, with no additional text or explanations.
    `;

      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192",
      });
      const groqAIResponse = response.choices[0]?.message?.content;
      console.log(groqAIResponse);
      if (groqAIResponse) {
        // Extract IDs from the response
        const recommendedItems = groqAIResponse
          .split("\n")
          .map((line) => {
            const match = line.match(
              /^(\d+)\.\s*ID:\s*(\d+),\s*(Title|Name|Title\/Name):\s*(.+)$/
            );
            if (match) {
              return {
                id: parseInt(match[2]),
                name: match[4].trim(),
              };
            }
            return null;
          })
          .filter(
            (item): item is { id: number; name: string } => item !== null
          );

        console.log(`Recommended items from AI: ${recommendedItems.length}`);

        // Find full data for recommended items
        const recommendedMovies = Movies.filter((movie) =>
          recommendedItems.some((item) => item.id === movie.id)
        );
        const recommendedTvShows = TvShows.filter((tvShow) =>
          recommendedItems.some((item) => item.id === tvShow.id)
        );

        console.log(`Found movies: ${recommendedMovies.length}`);
        console.log(`Found TV shows: ${recommendedTvShows.length}`);

        // Create a map of all recommended items
        const allRecommendedMap = new Map<
          number,
          { media_type: string } & ((typeof Movies)[0] | (typeof TvShows)[0])
        >([
          ...recommendedMovies.map(
            (movie) => [movie.id, { ...movie, media_type: "movie" }] as const
          ),
          ...recommendedTvShows.map(
            (tvShow) => [tvShow.id, { ...tvShow, media_type: "tv" }] as const
          ),
        ]);
        // Ensure we have 10 items, adding placeholder data for missing items
        const finalRecommendations = recommendedItems.map((item) => {
          const fullItem = allRecommendedMap.get(item.id);
          if (fullItem) {
            return fullItem;
          } else {
            console.log(item);
            const isMovie = Movies.find((moive) => moive.title === item.name);

            if (isMovie) return isMovie;
            const isTvShow = TvShows.find(
              (TvShow) => TvShow.name === item.name
            );
            if (isTvShow) return isTvShow;
            // If the item wasn't found in our data, create a placeholder
            return;
          }
        });

        console.log(`Final recommendations: ${finalRecommendations.length}`);

        // Separate the final recommendations into movies and TV shows
        const contentObject = {
          movies: finalRecommendations.filter(
            (item) => item?.media_type === "movie"
          ),
          tvShows: finalRecommendations.filter(
            (item) => item?.media_type === "tv"
          ),
        };

        console.log(`Final movies: ${contentObject.movies.length}`);
        console.log(`Final TV shows: ${contentObject.tvShows.length}`);
        // Send the content object back to the client
        res.json(contentObject);
      } else {
        res.status(400).json({ error: "Failed to generate recommendations" });
      }
    } catch (error) {
      console.error("Error in getRecommendations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
//
// });
