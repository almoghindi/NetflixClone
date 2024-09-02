import React, { useState } from "react";
import { NewContent } from "../../types/new-content";
import { sendRequest } from "../../hooks/use-request";

import {
  PlayIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
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
import {
  addContentToLiked,
  removeContentFromLiked,
  selectIsLiked,
} from "../../store/slices/liked-slice";

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
export interface MovieCardProps {
  movie: NewContent | TvProps;
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(
    useSelector((state: RootState) =>
      selectIsLiked(state.liked, movie.id as number)
    )
  );

  // Determine if the movie is already in the list
  const [isAddedToList, setIsAddedMyList] = useState(
    useSelector((state: RootState) =>
      selectIsMovieInList(state.myList, movie.id as number)
    )
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddMovie = async (): Promise<void> => {
    try {
      if (!user?.profileId) {
        throw new Error("Profile ID is missing.");
      }

      // Sanitize the profileId
      const sanitizedProfileId = sanitizeProfileId(user.profileId);
      console.log(sanitizedProfileId, "Sanitized Profile ID");
      console.log(movie);
      const data = await sendRequest({
        url: `/api/profile/${sanitizedProfileId}/${movie.media_type}/additem`,
        method: "POST",
        port: 3002,
        body: {
          Content: movie,
        },
      });

      console.log(data, "THE RES");
      setIsAddedMyList(true);
      dispatch(addMovieToList(movie));
      console.log("Movie added to watch list:", data);
    } catch (error) {
      console.error("Error adding movie to watch list:", error);
    }
  };
  // Example sanitizeProfileId function
  const sanitizeProfileId = (profileId: string) => {
    return profileId.replace(/\//g, "").replace(/\+/g, "").replace(/=/g, "");
  };

  const handleRemoveMovie = async (): Promise<void> => {
    try {
      const movieId = movie.id; // The ID of the movie to be removed
      const profileId = user?.profileId; // The ID of the profile

      if (!profileId || !movieId) {
        throw new Error("Profile ID or Movie ID is missing.");
      }

      const data = await sendRequest({
        url: `/api/profile/${profileId}/item/${movieId}`,
        method: "DELETE",
        port: 3002,
      });
      dispatch(removeMovieFromList(movie.id as number));
      console.log("Movie removed from watch list:", data);
      setIsAddedMyList(false);
      // You might want to update the UI or state here to reflect the deletion
    } catch (error) {
      console.error("Error removing movie from watch list:", error);
    }
  };

  const handlePlay = () => {
    console.log(movie.id);
    navigate(`/watch/${movie.id}/${movie.media_type || "movie"}`);
  };
  const id = useSelector((state: RootState) => state.auth.user?.userId);
  const handleLiked = async () => {
    dispatch(addContentToLiked(movie));
    await sendRequest({
      port: 3006,
      url: "/api/add-liked-content",
      method: "POST",
      body: {
        userId: id,
        Content: movie,
      },
    });
    setIsLiked(true);
    console.log(isLiked);
  };
  const handleDisLiked = async () => {
    dispatch(removeContentFromLiked(movie.id as number));
    await sendRequest({
      port: 3006,
      url: "/api/remove-liked-content",
      method: "DELETE",
      body: {
        userId: id,
        Content: movie,
      },
    });
    setIsLiked(false);
    console.log(isLiked);
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
            {isAddedToList ? (
              <MinusCircleIcon
                className="text-white cursor-pointer w-7 h-7 transition hover:bg-neutral-500 rounded-full"
                onClick={handleRemoveMovie}
                width={30}
                height={30}
              />
            ) : (
              <PlusCircleIcon
                className="text-white cursor-pointer w-7 h-7 transition hover:bg-neutral-500 rounded-full"
                onClick={handleAddMovie}
                width={30}
                height={30}
              />
            )}
            <div className="text-white cursor-pointer w-7 h-7 border-2 border-white rounded-full flex justify-center items-center transition hover:bg-neutral-500">
              {isLiked ? (
                <HandThumbDownIcon
                  width={20}
                  height={20}
                  onClick={handleDisLiked}
                />
              ) : (
                <HandThumbUpIcon width={20} height={20} onClick={handleLiked} />
              )}
            </div>
          </div>
          <div className="text-white mb-0">
            {movie.name || (movie as NewContent).original_title}
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
