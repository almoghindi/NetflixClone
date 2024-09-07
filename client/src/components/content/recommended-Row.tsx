import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { NewContent } from "../../types/new-content";

import MovieCard from "./movieCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const RecommendedRow: React.FC = () => {
  const [content, setContents] = useState<NewContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_SCREEN = 6;
  const ITEM_WIDTH = 350 + 20; // Width of a single item in pixels

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
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.max(content.length - ITEMS_PER_SCREEN, 0))
    );
  };

  const translateX = -currentIndex * ITEM_WIDTH;

  return (
    <>
      <div className={`relative space-y-0.5 md:space-y-2 px-4 mb-8 hover:z-50`}>
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          For You
        </h2>

        <div className="group relative">
          <ChevronLeftIcon
            className="z-50 w-12 h-12 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 hidden md:block"
            onClick={() => slideLeft()}
          />
          <ChevronRightIcon
            className="z-50 w-12 h-12 absolute text-white right-0 cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 hidden md:block"
            onClick={() => slideRight()}
          />
        </div>
        <div
          className="flex overflow-visible scrollbar-hide whitespace-nowrap space-x-1 md:space-x-2.5 lg:space-x-5 transition-transform duration-300"
          style={{ transform: `translateX(${translateX}px)` }}
          ref={sliderRef}
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
