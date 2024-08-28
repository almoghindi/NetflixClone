import React from "react";
import Video from "./video";

interface WatchMovieProps {
  movieId: string;
}

const WatchMovie: React.FC<WatchMovieProps> = ({ movieId }) => {
    {console.log(movieId + "hello from WatchMovie")}
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Video movieId={movieId} />
    </div>
  );
};

export default WatchMovie;
