import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Assuming you have this component already
import { sendRequest } from "../../hooks/use-request";
import ReactPlayer from "react-player";

const WatchTrailers = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the trailer ID for the movie
    console.log(import.meta.env.VITE_TMDB_API_KEY);

    const showMovies = async (): Promise<void> => {
      try {
        const data = await sendRequest({
          url: `/api/${movieId}`,
          method: "GET",
          port: 3003,
        });

        console.log(data);
        setTrailerUrl(data.trailerUrl);
      } catch (error) {
        new Error(error instanceof Error ? error.message : "An error occurred");
      }
    };

    if (movieId) {
      showMovies();
    }
  }, [movieId]);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      {trailerUrl ? (
        <ReactPlayer
          url={trailerUrl}
          playing={true}
          loop
          muted
          width="100%"
          height={"100vh"}
          controls={false}
        />
      ) : (
        <p className="text-white text-xl">Loading trailer...</p>
      )}
    </div>
  );
};

export default WatchTrailers;
