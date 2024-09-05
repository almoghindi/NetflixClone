import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addMovieToList,
  removeMovieFromList,
  selectIsMovieInList,
} from "../../store/slices/myListSlice";
import { NewContent } from "../../types/new-content";
import { TvProps } from "../content/contentRows";
import { sendRequest } from "../../hooks/use-request";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
const ListButton: React.FC<{ movie: NewContent | TvProps }> = ({ movie }) => {
  const dispatch = useDispatch<AppDispatch>();
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
        url: `/api/profile/${sanitizedProfileId}/${
          movie.media_type || "movie"
        }/additem`,
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

  return (
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
  );
};

export default ListButton;
