import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { filter, NewContent } from "../../types/new-content";
import Top10Card from "./top10-card";

const Top10Videos = ({ filter }: { filter: filter }) => {
  const [content, setContents] = useState<NewContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_SCREEN = 5;
  const ITEM_WIDTH = 315 + 128; // Width of a single item in pixels

  useEffect(() => {
    const showMovies = async (): Promise<void> => {
      try {
        const data = await sendRequest({
          url: `/redis/${filter.url}`,
          method: "GET",
          port: 3003,
        });

        console.log(data);
        setContents(data.content.results.slice(0, 10)); // Ensure we only get top 10
      } catch (error) {
        new Error(error instanceof Error ? error.message : "An error occurred");
      }
    };

    showMovies();
  }, [filter.url]);

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
    <div className={`relative space-y-0.5 md:space-y-2 px-4 mb-8 hover:z-50`}>
      <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {filter.title}
      </h2>
      <div className="group relative">
        <ChevronLeftIcon
          className={`z-50 w-6 h-6 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 hidden md:block ${
            currentIndex === 0 ? "invisible" : "visible"
          }`}
          onClick={slideLeft}
        />
        <ChevronRightIcon
          className={`z-50 w-6 h-6 absolute text-white right-0 cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 hidden md:block ${
            currentIndex >= content.length - ITEMS_PER_SCREEN
              ? "invisible"
              : "visible"
          }`}
          onClick={slideRight}
        />
      </div>
      <div
        className="flex overflow-visible scrollbar-hide items-center whitespace-nowrap  md:gap-24 lg:gap-24 xl:gap-24 transition-transform duration-300"
        style={{ transform: `translateX(${translateX}px)` }}
        ref={sliderRef}
        id={`slider-${filter.url}`}
      >
        {content.map((movie, index) => (
          <div
            key={movie.id}
            className={`flex items-center space-x-2 relative w-1/3 ${
              index !== 0 ? "ml-24 sm:ml-16" : "ml-8 lg:ml-12 xl:ml-24 md:ml-12"
            }`}
          >
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
            <Top10Card movie={{ ...movie, media_type: "movie" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top10Videos;
