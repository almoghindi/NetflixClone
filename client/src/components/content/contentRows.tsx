import { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sendRequest } from "../../hooks/use-request";
import { filter, NewContent } from "../../types/new-content";
import MovieCard from "./movieCard";

export interface TvProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const ContentRows = ({ filter }: { filter: filter }) => {
  const [content, setContent] = useState<(NewContent | TvProps)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_SCREEN = 6;
  const ITEM_WIDTH = 350 + 20; // Width of a single item in pixels

  useEffect(() => {
    const fetchContent = async (): Promise<void> => {
      try {
        const data = await sendRequest({
          url: `/redis/${filter.url}`,
          method: "GET",
          port: 3003,
        });

        if (
          filter.url === "trending/all" ||
          filter.url === "tv" ||
          filter.url === "trending/tv"
        ) {
          if (Array.isArray(data.content)) {
            setContent(data.content);
          } else {
            console.error("Expected an array but received:", data.content);
            setContent([]); // Clear content if not an array
          }
        } else {
          if (Array.isArray(data.content.results)) {
            setContent(data.content.results);
          } else {
            console.error(
              "Expected an array but received:",
              data.content.results
            );
            setContent([]); // Clear content if not an array
          }
        }
      } catch (error) {
        console.error("Fetch content error:", error);
        setContent([]); // Clear content on error
      }
    };
    fetchContent();
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
    <div className={`relative  space-y-0.5 md:space-y-2 px-4 mb-8 hover:z-50`}>
      <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {filter.title}
      </h2>

      <div className="group relative">
        <ChevronLeftIcon
          className={`z-50 w-12 h-12 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 p-2 rounded-full ${
            currentIndex === 0 ? "invisible" : "visible"
          }`}
          onClick={slideLeft}
        />
        <ChevronRightIcon
          className={`z-50 w-12 h-12 absolute text-white right-0 cursor-pointer mt-[4.5rem] opacity-50 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 p-2 rounded-full ${
            currentIndex >= content.length - ITEMS_PER_SCREEN
              ? "invisible"
              : "visible"
          }`}
          onClick={slideRight}
        />
      </div>

      <div
        id={`slider-${filter.url}`}
        ref={sliderRef}
        className="flex overflow-visible scrollbar-hide whitespace-nowrap space-x-1 md:space-x-2.5 lg:space-x-5 transition-transform duration-300"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="scroll-snap-align-start w-[350px] min-w-[350px] item transition-transform duration-300"
          >
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRows;
