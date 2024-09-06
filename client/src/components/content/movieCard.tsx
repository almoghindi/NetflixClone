import React from "react";
import { NewContent } from "../../types/new-content";
import { useNavigate } from "react-router-dom";
import { TvProps } from "./contentRows";
import HoverMenu from "../card/hover-menu";

export interface MovieCardProps {
  movie: NewContent | TvProps;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const handlePlay = () => {
    console.log(movie.id);
    navigate(`/watch/${movie.id}/${movie.media_type || "movie"}`);
  };

  return (
    <div className={`group justify-center items-start  `}>
      <div
        className={`w-[350px] min-w-[350px] duration-500 transition-transform ease-in-out group-hover:scale-125 group-hover:z-50 group-hover:absolute group-hover:shadow-lg`}
      >
        <img
          className="cursor-pointer object-cover rounded-md h-full w-full "
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          onClick={handlePlay}
          alt={movie.name || (movie as NewContent).original_title}
          loading="lazy" // Add lazy loading here
        />
        {/* {isHoverd && <HoverMenu movie={movie} />} */}
        <div className={`hidden group-hover:block`}>
          <HoverMenu movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
