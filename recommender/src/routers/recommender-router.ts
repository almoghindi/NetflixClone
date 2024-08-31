import { Router, Request, Response } from "express";
import {
  TVShowContent,
  MovieContent,
  LikedContent,
} from "../models/liked-content";
import Groq from "groq-sdk";

import expressAsyncHandler from "express-async-handler";
import { RecommenderController } from "../controllers/reccomender-controller";
interface TMDBResponse<T> {
  results: T[];
}

const router: Router = Router();
const system_content =
  "You are a movie and TV show expert. Be insightful, engaging, and provide detailed information.";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.get("/recommendations", async (req: Request, res: Response) => {
  try {
    // const ai = new OpenAI({
    //   apiKey: "89187466b1074a5eb4c8b9578e849410",
    //   baseURL: "https://api.aimlapi.com",
    // });

    const userId = "someUserId";
    const LikedItems = await LikedContent.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    const MoviesPageresponse = await fetch(
      `http://api.themoviedb.org/3/trending/all/day?language=en-US`,
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
      `http://api.themoviedb.org/3/trending/all/day?language=en-US`,
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
Based on the following list of Movies and TV Shows, along with the user's last 10 liked items, recommend the best 10 Movies and TV Shows for the user. Ensure that no movie or TV show is repeated in the recommendations, and include the unique ID for each recommended item.

### Available Movies:
${Movies.map(
  (movie, index) =>
    `${index}- ID: ${movie.id}, Title: ${movie.title}, Release Date: ${
      movie.release_date
    }, Genres: ${movie.genre_ids.join(", ")}, Rating: ${
      movie.vote_average
    }, Overview: ${movie.overview}`
).join("\n")}

### Available TV Shows:
${TvShows.map(
  (tvShow) =>
    `- ID: ${tvShow.id}, Name: ${tvShow.name}, First Air Date: ${
      tvShow.first_air_date
    }, Genres: ${tvShow.genre_ids.join(", ")}, Rating: ${
      tvShow.vote_average
    }, Overview: ${tvShow.overview}`
).join("\n")}

### User's Last 10 Liked Items:
${LikedItems.map(
  (likedItem, index) =>
    `- ${index}: ${
      likedItem.contentData.title || likedItem.contentData.name
    } (${likedItem.contentData.media_type}, ID: ${likedItem.contentData.id})`
).join("\n")}

### Recommendations:
Please make sure is 10 Movies and TV Shows for the user based on the above data.
and return prompt json with only the indexs of the movies and then the indexs of the tvshows
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
    const openAIResponse = response.choices[0]?.message?.content;
    res.send({ openAIResponse });
  } catch (err) {
    console.log(err);
  }
});
router.post(
  "/add-liked-content",
  expressAsyncHandler(RecommenderController.AddedLikedContent)
);

//     if (openAIResponse) {
//       const recommendations = openAIResponse
//         .split("\n")
//         .map((line) => {
//           const match = line.match(/(\w+):/);
//           if (match) {
//             const [_, id, title, sport, price] = match;
//             const ticket = 40Movies.find((t) => t.id.toString() === id);
//             return ticket
//               ? {
//                   id: ticket._id,
//                   title: ticket.title,
//                   sport: ticket.sport,
//                   date: ticket.date,
//                   price: ticket.price,
//                 }
//               : null;
//           }
//           return null;
//         })
//         .filter(
//           (ticket): ticket is NonNullable<typeof ticket> => ticket !== null
//         );

//       res.json({ recommendations });
//     } else {
//       throw new Error("No recommendations returned from OpenAI");
//     }
//   } catch (error) {
//     console.error("Error generating recommendations:", error);

//     const fallbackTickets = await Ticket.find().sort({ date: -1 }).limit(6);
//     const fallbackRecommendations = fallbackTickets.map((ticket) => ({
//       id: ticket._id,
//       title: ticket.title,
//       sport: ticket.sport,
//       date: ticket.date,
//       price: ticket.price,
//     }));
//     res.status(200).json({ recommendations: fallbackRecommendations });
//   }
// });

export default router;
