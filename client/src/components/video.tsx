import React, { useEffect, useState } from "react";
import { VideoResponse } from "../types/video";
import ReactPlayer from "react-player";

const Video = ({ movieId }: { movieId: number }) => {
  const [trailer, setTrailer] = useState("");

  const getTrailer = async (movieId: number): Promise<void> => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data: VideoResponse) => {
        const trailers = data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          const trailerUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
          setTrailer(trailerUrl);
        } else {
          console.log("No trailer found for this movie.");
        }
      })
      .catch((error) => console.error("Error fetching trailer:", error));
  };

  useEffect(() => {
    getTrailer(movieId);
  }, [movieId]);

  return (
    <div className="z-60  ">
      {trailer && (
        <ReactPlayer
          url={trailer}
          playing={true}
          loop
          muted
          width="100%"
          height={"80vh"}
          controls={false}
        />
      )}
      <p className="text-white text-3xl">{}</p>
    </div>
  );
};

export default Video;
