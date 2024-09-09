import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { filter, NewContent } from "../../types/new-content";
import Top10Card from "./top10-card";
import { useSwipeable } from "react-swipeable";

const Top10Videos = ({ filter }: { filter: filter }) => {
  const [content, setContents] = useState<NewContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_SCREEN = isMobile ? 2 : 2;
  const ITEM_WIDTH = isMobile ? 200 : 315 + 128; // Width of a single item in pixels

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

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    showMovies();
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [filter.url]);

  const slideLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - ITEMS_PER_SCREEN, 0));
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(
        prevIndex + ITEMS_PER_SCREEN,
        Math.max(content.length - ITEMS_PER_SCREEN, 0)
      )
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
        {filter.title}
      </h2>

      <div className="group relative">
        {!isMobile && (
          <>
            <ChevronLeftIcon
              className={`z-50 w-12 h-12 absolute left-0 top-16 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 transition-opacity bg-black bg-opacity-50 p-2 rounded-full ${
                currentIndex === 0 ? "invisible" : "visible"
              }`}
              onClick={slideLeft}
            />
            <ChevronRightIcon
              className={`z-50 w-12 h-12 absolute right-0 top-16 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100 transition-opacity bg-black bg-opacity-50 p-2 rounded-full ${
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
        className={`flex items-center whitespace-nowrap scrollbar-hide transition-transform duration-300 ${
          isMobile
            ? "overflow-x-scroll gap-4"
            : "overflow-visible md:gap-24 lg:gap-24 xl:gap-24"
        }`}
        style={{
          transform: `translateX(-${currentIndex * ITEM_WIDTH}px)`,
        }}
        ref={sliderRef}
        id={`slider-${filter.url}`}
      >
        {content.map((movie, index) => (
          <div
            key={movie.id}
            className={`flex items-center space-x-14 relative ${
              isMobile ? "w-[200px] min-w-[200px]" : "w-1/3"
            } ${
              index !== 0 ? "ml-24 sm:ml-16" : "ml-8 lg:ml-12 xl:ml-24 md:ml-12"
            }`}
          >
            <img
              src={`https://www.netflix.com/tudum/top10/images/big_numbers/${
                index + 1
              }.png`}
              alt={`Number ${index + 1}`}
              className={`
              w-full
              mt-10
              sm:w-1/3         
              md:w-3/4         
              lg:w-3/4         
              xl:w-3/4         
              object-contain   
              absolute
              z-10  
              ${isMobile ? "-left-20" : "-left-20"}        
              sm:-left-44      
              md:-left-left-44 
              lg:-left-left-44 
              xl:-left-left-54 
            `}
            />
            <div className="relative z-20">
              <Top10Card movie={{ ...movie, media_type: "movie" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top10Videos;
