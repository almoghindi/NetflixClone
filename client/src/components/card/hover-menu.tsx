import React from "react";
import PlayButton from "./play-button";
import ListButton from "./list-button";
import LikeButton from "./Like-button";
import MoreButton from "./more-button";
import { genreLookup } from "../../utils/genres";
import { TvProps } from "../content/contentRows";
import { NewContent } from "../../types/new-content";

const HoverMenu: React.FC<{ movie: TvProps | NewContent }> = ({ movie }) => {
  return (
    <div className="bg-zinc-800 p-3 rounded-b-md shadow-xl ">
      <div className="flex flex-row items-center gap-3 mb-2">
        <PlayButton movie={movie} />
        <ListButton movie={movie} />
        <LikeButton movie={movie} />
        <MoreButton /> {/*TODO: implement more option */}
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
  );
};

export default HoverMenu;
