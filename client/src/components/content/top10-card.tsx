import React from "react";
import { NewContent } from "../../types/new-content";
import { useNavigate } from "react-router-dom";
import { TvProps } from "./contentRows";
import HoverMenu from "../card/hover-menu";

export interface MovieCardProps {
  movie: NewContent | TvProps;
}

const Top10Card: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    console.log(movie.id);
    navigate(`/watch/${movie.id}/${movie.media_type || "movie"}`);
  };

  return (
    <div className="scroll-snap-align-start min-w-[300px] item transition-transform duration-300">
      <div className={`group justify-center items-start`}>
        <div
          className={`h-[300px] w-[250px] duration-500 transition-transform ease-in-out group-hover:scale-125 group-hover:z-50 group-hover:shadow-lg`}
        >
          <img
            className="cursor-pointer object-cover rounded-md h-full w-full group-hover:hidden"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            onClick={handlePlay}
            alt={movie.name || (movie as NewContent).original_title}
            loading="lazy"
          />
          <img
            className="hidden cursor-pointer object-cover rounded-md h-full w-full group-hover:block"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            onClick={handlePlay}
            alt={movie.name || (movie as NewContent).original_title}
            loading="lazy"
          />
          <div className={`hidden group-hover:block`}>
            <HoverMenu movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10Card;
