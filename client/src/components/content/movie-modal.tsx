import React, { useState } from "react";
import { NewContent } from "../../types/new-content";
import { sendRequest } from "../../hooks/use-request";
import {
  PlayIcon,
  PlusCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  CheckCircleIcon,
  ChevronDownIcon,
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
interface MovieModalProps {
  movie: NewContent | TvProps;
}

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

const MovieModal: React.FC<MovieModalProps> = ({ movie }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(
    useSelector((state: RootState) =>
      selectIsLiked(state.liked, movie.id as number)
    )
  );

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

  const sanitizeProfileId = (profileId: string) => {
    return profileId.replace(/\//g, "").replace(/\+/g, "").replace(/=/g, "");
  };

  const handleRemoveMovie = async (): Promise<void> => {
    try {
      const movieId = movie.id;
      const profileId = user?.profileId;

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
    <div className=" relative z-50 flex items-center justify-center">
      <div
        className={`relative w-[250px] duration-500 transition-transform scale-150 z-50 `}
      >
        <img
          className="cursor-pointer object-cover rounded-md h-full w-full"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          onClick={handlePlay}
          alt={movie.name || (movie as NewContent).original_title}
        />
        <div className="bg-zinc-800 p-3 rounded-b-md shadow-xl">
          <div className="flex flex-row items-center gap-3 mb-2">
            <button
              className="cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={handlePlay}
            >
              <PlayIcon className="w-5 h-5 text-black" />
            </button>
            <button
              className="text-white cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex justify-center items-center transition hover:border-white"
              onClick={isAddedToList ? handleRemoveMovie : handleAddMovie}
            >
              {isAddedToList ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <PlusCircleIcon className="w-5 h-5" />
              )}
            </button>
            <button
              className="text-white cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex justify-center items-center transition hover:border-white"
              onClick={isLiked ? handleDisLiked : handleLiked}
            >
              {isLiked ? (
                <HandThumbDownIcon className="w-5 h-5" />
              ) : (
                <HandThumbUpIcon className="w-5 h-5" />
              )}
            </button>
            <button className="text-white cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex justify-center items-center transition hover:border-white ml-auto">
              <ChevronDownIcon className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-white text-sm font-bold mb-1">
            {movie.name || (movie as NewContent).original_title}
          </h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genre_ids.slice(0, 3).map((genre: number, index: number) => (
              <span
                key={index}
                className="text-white text-xs bg-red-600 px-1 rounded"
              >
                {genreLookup[genre]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
