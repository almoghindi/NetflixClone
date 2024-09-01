import React, { useEffect, useState } from "react";
import { NewContent } from "../../types/new-content";
import {
  PlayIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  HandThumbUpIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addMovieToList,
  removeMovieFromList,
  selectIsMovieInList,
} from "../../store/slices/myListSlice";
import { TvProps } from "./contentRows";

import { sendRequest } from "../../hooks/use-request";
const genreLookup: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
interface MovieCardProps {
  movie: NewContent | TvProps;
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  // Determine if the movie is already in the list
  const isAddedToMyList = useSelector((state: RootState) =>
    selectIsMovieInList(state.myList, movie.id as number)
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const handleAddMovie = async (movie: NewContent): Promise<void> => {
    try {
      const id = "b6437740-0320-4ba4-9325-45ec52c1139c";
      const data = await sendRequest({
        url: `/api/profile/${id}/additem`,
        method: "POST",
        port: 3002,
        body: { content_id: movie.id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Movie added to watch list:", data);
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };
  const handleRemoveMovie = async (movie: NewContent): Promise<void> => {
    try {
      const id = "b6437740-0320-4ba4-9325-45ec52c1139c";
      const data = await sendRequest({
        url: `/api/profile/${id}/additem`,
        method: "DELETE",
        port: 3002,
        body: { content_id: movie.id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Movie added to watch list:", data);
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handlePlay = () => {
    console.log(movie.id);
    navigate(`/watch/${movie.id}/${movie.media_type || "movie"}`);
  };

  return (
    <div
      className={`group relative black col-span transition-all duration-300 ease-in-out ${
        isHovered ? "h-[20vw] translate-y-4" : "h-[12vw]"
      } w-[160px] sm:w-[200px] md:w-[240px] lg:w-[350px] xl:w-[400px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="cursor-pointer object-cover transition duration shadow-md rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-full"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        onClick={handlePlay}
        alt={movie.name}
      />

      <div className="opacity-0 absolute top-0 transition duration-500 z-10 invisible sm:visible delay-100 w-full scale-0 group-hover:scale-110 group-hover:opacity-100">
        <img
          className="cursor-pointer object-cover duration shadow-xl rounded-t-md w-full h-[12vw]"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          onClick={handlePlay}
          alt={movie.name}
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-3 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={handlePlay}
            >
              <PlayIcon width={16} height={20} />
            </div>
            {isAddedToMyList ? (
              <MinusCircleIcon
                className="text-white cursor-pointer w-7 h-7 transition hover:bg-neutral-500 rounded-full"
                onClick={() => handleRemoveMovie}
                width={30}
                height={30}
              />
            ) : (
              <PlusCircleIcon
                className="text-white cursor-pointer w-7 h-7 transition hover:bg-neutral-500 rounded-full"
                onClick={() => handleAddMovie(movie as NewContent)}
                width={30}
                height={30}
              />
            )}
            <div className="text-white cursor-pointer w-7 h-7 border-2 border-white rounded-full flex justify-center items-center transition hover:bg-neutral-500">
              <HandThumbUpIcon width={20} height={20} onClick={() => {}} />
            </div>
          </div>
          <div className="text-white mb-0">
            {movie.name || movie.original_title}
          </div>
          <div className="flex flex-row mt-0 gap-2 items-center">
            <p className="text-white text-[8px] lg:text-xs">
              {movie.genre_ids.map((genre: number, index: React.Key) => (
                <span
                  key={index}
                  className="text-white text-[0.75rem] lg:text-sm sm:text-[8px]"
                >
                  {genreLookup[genre]}
                  {index !== movie.genre_ids.length - 1 && " • "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
