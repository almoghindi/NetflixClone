import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { NewContent } from "../../types/new-content";
import MovieCard from "./movieCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useSwipeable } from 'react-swipeable';

const RecommendedRow: React.FC = () => {
  const [content, setContents] = useState<NewContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_SCREEN = isMobile ? 2 : 6;
  const ITEM_WIDTH = isMobile ? 175 : 350 + 20; // Width of a single item in pixels

  const userId = useSelector((state: RootState) => state.auth.user!.userId)!;

  useEffect(() => {
    const getRecommended = async (): Promise<void> => {
      try {
        const data = await sendRequest({
          url: `/api/recommendations/${userId}`,
          method: "GET",
          port: 3006,
        });
        setContents([...data.movies, ...data.tvShows]);
      } catch (error) {
        new Error(error instanceof Error ? error.message : "An error occurred");
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    getRecommended();
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userId]);

  const slideLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - ITEMS_PER_SCREEN, 0));
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + ITEMS_PER_SCREEN, Math.max(content.length - ITEMS_PER_SCREEN, 0))
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (eventData.velocity > 0.5) {
        slideRight();
      }
    },
    onSwipedRight: (eventData) => {
      if (eventData.velocity > 0.5) {
        slideLeft();
      }
    },
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div className={`relative space-y-0.5 md:space-y-2 px-4 mb-8 hover:z-50`}>
      <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        For You
      </h2>

      <div className="group relative">
        {!isMobile && (
          <>
            <ChevronLeftIcon
              className={`z-50 w-12 h-12 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 ${
                currentIndex === 0 ? "invisible" : "visible"
              }`}
              onClick={slideLeft}
            />
            <ChevronRightIcon
              className={`z-50 w-12 h-12 absolute text-white right-0 cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 ${
                currentIndex >= content.length - ITEMS_PER_SCREEN
                  ? "invisible"
                  : "visible"
              }`}
              onClick={slideRight}
            />
          </>
        )}
      </div>
      <div
        {...handlers}
        className={!isMobile ? 
          "flex overflow-visible scrollbar-hide whitespace-nowrap space-x-1 md:space-x-2.5 lg:space-x-5 transition-transform duration-300" 
          : 
          "flex overflow-x-scroll scrollbar-hide whitespace-nowrap space-x-1 md:space-x-2.5 lg:space-x-5 transition-transform duration-300"}
        style={{
          transform: `translateX(-${currentIndex * ITEM_WIDTH}px)`,
        }}
        ref={sliderRef}
        id={`slider-recommendations`}
      >
        {content &&
          content.map((movie, index) => (
            <div
              key={index}
              className={`scroll-snap-align-start ${
                isMobile
                  ? "w-[175px] min-w-[175px]"
                  : "w-[350px] min-w-[350px]"
              } item transition-transform duration-300`}
            >
              <MovieCard movie={movie} isMobile={isMobile} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecommendedRow;