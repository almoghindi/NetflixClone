import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { NewContent } from "../../types/new-content";

import MovieCard from "./movieCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const RecommendedRow: React.FC = () => {
  const [content, setContents] = useState<NewContent[]>([]);
  const [translateX, setTranslateX] = useState(0);
  const visibleItems = 5.13; // Number of visible items at once

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
        setContents([...data.movies, ...data.tvShows]);
      } catch (error) {
        new Error(error instanceof Error ? error.message : "An error occurred");
      }
    };
    getRecommended();
  }, [userId]);

  const slideLeft = () => {
    setTranslateX((prev) => Math.min(prev + 25, 0)); // Slide left by 25%
  };

  const slideRight = () => {
    const maxTranslateX = -(
      (content.length - visibleItems) *
      (100 / visibleItems)
    );
    setTranslateX((prev) => Math.max(prev - 25, maxTranslateX)); // Slide right by 25%
  };

  return (
    <>
      <div className={`relative space-y-0.5 md:space-y-2 px-4 mb-8 hover:z-50`}>
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          For You
        </h2>

        <div className="group relative">
          <ChevronLeftIcon
            className="z-50 w-6 h-6 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 hidden md:block"
            onClick={() => slideLeft()}
          />
          <ChevronRightIcon
            className="z-50 w-6 h-6 absolute text-white right-0 cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 hidden md:block"
            onClick={() => slideRight()}
          />
        </div>
        <div
          className="flex overflow-visible scrollbar-hide whitespace-nowrap space-x-1 md:space-x-2.5 lg:space-x-5 transition-transform duration-300"
          style={{ transform: `translateX(${translateX}%)` }}
          id={`slider-recommendations`}
        >
          {content &&
            content.map((movie, index) => (
              <div
                key={index}
                className="scroll-snap-align-start w-[350px] min-w-[350px] item transition-transform duration-300"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRow;
