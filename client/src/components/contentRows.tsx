import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { sendRequest } from "../hooks/use-request";
import { filter, NewContent } from "../types/new-content";
import Video from "./video"; // Import the Video component
import { StarIcon } from "@heroicons/react/20/solid";

const ContentRows = ({ filter }: { filter: filter }) => {
  const [movies, setMovies] = useState<NewContent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<NewContent | null>(null);

  const showMovies = async (): Promise<void> => {
    try {
      const data = await sendRequest({
        url: `/api/${filter.url}`,
        method: "GET",
      });
      setMovies(data.content);
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    showMovies();
  }, [filter.url]);

  const slideLeft = () => {
    const slider = document.getElementById("slider") as HTMLElement;
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider") as HTMLElement;
    slider.scrollLeft += 500;
  };

  const handlePlay = (movie: NewContent) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4 ms-5">
        {filter.title}
      </h2>
      <div className="relative flex items-center group">
        <ChevronLeftIcon
          id="left-arrow"
          onClick={slideLeft}
          className="text-white cursor-pointer absolute z-50 left-0 mt-16 hidden group-hover:block"
          width={40}
        />
        <div
          id="slider"
          className="w-full h-[400px] overflow-x-visible overflow-y-visible overflow- scroll-smooth whitespace-nowrap relative custom-scrollbar"
        >
          {movies.map((movie, index) => (
            <div
              onClick={() => handlePlay(movie)}
              key={index}
              className="w-[160px] h-[90px] sm:w-[200px] sm:h-[112px] md:w-[240px] md:h-[135px] lg:w-[full] lg:h-full inline-block cursor-pointer relative p-2 overflow-visible transform hover:scale-150 hover:z-20 transition duration-300"
            >
              <img
                className="w-full h-full block rounded object-fit"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
        <ChevronRightIcon
          id="right-arrow"
          onClick={slideRight}
          className="text-white cursor-pointer absolute z-50 right-0 mt-16 hidden group-hover:block "
          width={40}
        />
      </div>
      {/* Modal */}
      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-4/5 mx-auto bg-black rounded-lg overflow-hidden">
            <p className="text-white text-4xl p-4">{selectedMovie.title}</p>
            <p className="text-white text-lg p-4 ">{selectedMovie.overview}</p>
            <p className="text-white flex text-lg p-4 ">
              {selectedMovie.release_date.split("-")[0]}
              {" | "}
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
              <button>
                <SpeakerWaveIcon
                  width={40}
                  height={40}
                  className="text-white absolute top-1/3  right-40 mt-96"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentRows;
