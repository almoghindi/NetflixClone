import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { filter, NewContent } from "../../types/new-content";

import MovieCard from "./movieCard";

const ContentRows = ({ filter }: { filter: filter }) => {
  const [movies, setMovies] = useState<NewContent[]>([]);

  useEffect(() => {
    const showMovies = async (): Promise<void> => {
      try {
        const data = await sendRequest({
          url: `/api/${filter.url}`,
          method: "GET",
          port: 8000,
        });
        setMovies(data.content);
      } catch (error) {
        new Error(error instanceof Error ? error.message : "An error occurred");
      }
    };
    showMovies();
  }, [filter.url]);

  const slideLeft = (id: string) => {
    const slider = document.getElementById(id) as HTMLElement;
    slider.scrollLeft -= 500;
  };

  const slideRight = (id: string) => {
    const slider = document.getElementById(id) as HTMLElement;
    slider.scrollLeft += 500;
  };

  return (
    <>
      <div className="px-4 md:px-12 mt-4 space-y-8">
        <div className="">
          <p className="text-white text-xl md:text:xl lg-text-2xl xl:text-3xl font-semibold mb-4">
            {filter.title}
          </p>
          <ChevronLeftIcon
            className="w-6 h-6 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100"
            onClick={() => slideLeft(`slider-${filter.url}`)}
          />
          <ChevronRightIcon
            className="w-6 h-6 absolute text-white right-0 cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100"
            onClick={() => slideRight(`slider-${filter.url}`)}
          />
          <div
            className="relative gap-2 flex items-center w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            id={`slider-${filter.url}`}
          >
            {movies &&
              movies.map((movie, index) => (
                <div key={index}>
                  <MovieCard movie={movie} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentRows;
