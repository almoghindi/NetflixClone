import { useNavigate } from "react-router-dom";
import { NewContent } from "../../types/new-content";
import { TvProps } from "../content/contentRows";
import { PlayIcon } from "@heroicons/react/20/solid";

const PlayButton: React.FC<{ movie: TvProps | NewContent }> = ({ movie }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    console.log(movie.id);
    navigate(`/watch/${movie.id}/${movie.media_type || "movie"}`);
  };
  return (
    <button
      className="cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
      onClick={handlePlay}
    >
      <PlayIcon className="w-5 h-5 text-black" />
    </button>
  );
};
export default PlayButton;
