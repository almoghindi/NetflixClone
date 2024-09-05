import React, { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addContentToLiked,
  removeContentFromLiked,
  selectIsLiked,
} from "../../store/slices/liked-slice";
import { TvProps } from "../content/contentRows";
import { NewContent } from "../../types/new-content";
import { sendRequest } from "../../hooks/use-request";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";

const LikeButton: React.FC<{ movie: TvProps | NewContent }> = ({ movie }) => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootState) => state.auth.user?.userId);
  const [isLiked, setIsLiked] = useState(
    useSelector((state: RootState) =>
      selectIsLiked(state.liked, movie.id as number)
    )
  );
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
  );
};

export default LikeButton;
