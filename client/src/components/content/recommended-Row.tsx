import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { NewContent } from "../../types/new-content";

import MovieCard from "./movieCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const RecommendedRow: React.FC = () => {
  const [movies, setMovies] = useState<NewContent[]>([]);

  const userId = useSelector((state: RootState) => state.auth.user!.userId)!;
  console.log(userId);
  useEffect(() => {
    const getRecommended = async (): Promise<void> => {
      try {
        console.log(userId + "  2");
        const data = await sendRequest({
          url: `/api/recommendations/${userId}`,
          method: "GET",
          port: 3006,
        });
        console.log([...data.movies, ...data.tvShows]);
        setMovies([...data.movies, ...data.tvShows]);
      } catch (error) {
        new Error(error instanceof Error ? error.message : "An error occurred");
      }
    };
    getRecommended();
  }, [userId]);

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
      <div className="px-4 md:px-12 mt-4 space-y-8 ">
        <p className="text-white text-xl md:text:xl lg-text-2xl xl:text-3xl font-semibold mb-4  ">
          For You
        </p>
        <div className=" ">
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
              sm:block  
              hidden    
            "
            onClick={() => slideLeft(`slider-recommendations`)}
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
              sm:block   
              hidden     
            "
            onClick={() => slideRight(`slider-recommendations`)}
          />
        </div>
        <div
          className="relative gap-2 flex items-center w-full h-full overflow-x-scroll  whitespace-nowrap scroll-smooth  scrollbar-hide "
          id={`slider-recommendations`}
        >
          {movies &&
            movies.map((movie, index) => (
              <div key={index}>
                <MovieCard movie={movie} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRow;
