import React, { useState } from "react";
import { NewContent } from "../../types/new-content";
import { PlayIcon } from "@heroicons/react/20/solid";
import { HandThumbUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Video from "./video";
import { StarIcon } from "@heroicons/react/20/solid";

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

const MovieCard = ({ movie }: { movie: NewContent }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<NewContent | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = (movie: NewContent) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
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
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="opacity-0 absolute top-0 transition duration-500 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:opacity-100">
        <img
          className="cursor-pointer object-cover duration shadow-xl rounded-t-md w-full h-[12vw]"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-3 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => handlePlay(movie)}
            >
              <PlayIcon width={16} height={20} />
            </div>
            <PlusCircleIcon
              className="text-white cursor-pointer w-7 h-7 transition hover:bg-neutral-500 rounded-full"
              onClick={() => {}}
              width={30}
              height={30}
            />
            <div className="text-white cursor-pointer w-7 h-7 border-2 border-white rounded-full flex justify-center items-center transition hover:bg-neutral-500">
              <HandThumbUpIcon width={20} height={20} onClick={() => {}} />
            </div>
          </div>
          <div className="text-white mb-0">{movie.title}</div>
          {movie.release_date && movie.release_date.split("-")[0] === "2024" ? (
            <p className="text-green-400 font-semibold mt-0">
              {/* New{" "}
              <span className="text-white">
                {movie.release_date && movie.release_date.split("-")[0]}
              </span> */}
            </p>
          ) : (
            <p className="text-white font-semibold mt-0">
              {movie.release_date && movie.release_date.split("-")[0]}
            </p>
          )}
          <div className="flex flex-row mt-0 gap-2 items-center">
          <p className="text-white text-[8px] lg:text-xs">
            {movie.genre_ids.map((genre: number, index) => (
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

      {/* Modal */}
      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-4/5 mx-auto bg-black rounded-lg overflow-hidden">
            <p className="text-white text-4xl p-4">{selectedMovie.title}</p>
            <p className="text-white text-lg p-4">{selectedMovie.overview}</p>
            <p className="text-white flex text-lg p-4">
              {selectedMovie.release_date.split("-")[0]} {" | "}
              {selectedMovie.vote_average}
              <StarIcon
                width={20}
                height={20}
                className="text-yellow-500 mt-0.5 ms-2"
              />
            </p>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white text-lg z-50"
            >
              Close
            </button>
            <div className="lg:h-70 w-full">
              <Video movieId={selectedMovie.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
