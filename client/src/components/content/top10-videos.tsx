import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { filter, NewContent } from "../../types/new-content";
import MovieCard from "./movieCard";

const Top10Videos = ({ filter }: { filter: filter }) => {
  const [movies, setMovies] = useState<NewContent[]>([]);

  const showMovies = async (): Promise<void> => {
    try {
      console.log(filter);
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

  useEffect(() => {
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
          className="
                w-6 h-6 
                absolute 
                left-0 
                text-white 
                cursor-pointer 
                mt-[4.5rem] 
                opacity-50 
                hover:opacity-100 
                z-10 
                sm:block 
                hidden   
              "
          onClick={() => slideLeft(`slider-${filter.url}`)}
        />
        <ChevronRightIcon
          className="
                w-6 h-6 
                absolute 
                right-0 
                text-white 
                cursor-pointer 
                mt-[4.5rem] 
                opacity-50 
                hover:opacity-100 
                z-10 
                sm:block  
                hidden    
              "
          onClick={() => slideRight(`slider-${filter.url}`)}
        />
        <div
          className="flex items-center  overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide md:gap-24 lg:gap-24 xl:gap-24"
          id={`slider-${filter.url}`}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`flex items-center space-x-2 relative w-1/3 ${
                index !== 0 ? 'ml-24 sm:ml-16' : 'ml-8 lg:ml-12 xl:ml-24 md:ml-12'}`}>
              <img
                src={`https://www.netflix.com/tudum/top10/images/big_numbers/${
                  index + 1
                }.png`}
                alt={`Number ${index + 1}`}
                className="
                  w-1/3            
                  sm:w-1/3         
                  md:w-3/4         
                  lg:w-3/4         
                  xl:w-3/4         
                  object-contain   
                  absolute         
                  -left-10         
                  sm:-left-44      
                  md:-left-left-44 
                  lg:-left-left-44 
                  xl:-left-left-54 
                "
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
