import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { filter, NewContent } from "../../types/new-content";
import MovieCard from "./movieCard";

const Top10Videos = ({ filter }: { filter: filter }) => {
  const [movies, setMovies] = useState<NewContent[]>([]);

  useEffect(() => {
    const showMovies = async (): Promise<void> => {
      try {
        const data = await sendRequest({
          url: `/redis/${filter.url}`,
          method: "GET",
          port: 3003,
        });

        console.log(data);
        setMovies(data.content.results.slice(0, 10)); // Ensure we only get top 10
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
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <p className="text-white text-xl md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4">
        {filter.title}
      </p>
      <div className="relative">
        <ChevronLeftIcon
          className="w-6 h-6 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 z-10"
          onClick={() => slideLeft(`slider-${filter.url}`)}
        />
        <ChevronRightIcon
          className="w-6 h-6 absolute right-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 z-10"
          onClick={() => slideRight(`slider-${filter.url}`)}
        />
        <div
          className="flex items-center gap-24  overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          id={`slider-${filter.url}`}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="ml-24 flex items-center space-x-2 relative"
            >
              <img
                src={`https://www.netflix.com/tudum/top10/images/big_numbers/${
                  index + 1
                }.png`}
                alt={`Number ${index + 1}`}
                className="h-full w-3/4 object-contain absolute -left-44 "
              />
              <div className="relative">
                <MovieCard movie={{ ...movie, media_type: "movie" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top10Videos;
