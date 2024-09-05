import { useEffect, useState } from "react";
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
    const slider = document.getElementById(`slider-${filter.url}`);
    if (slider) slider.scrollLeft -= 600; // Slightly larger scroll increment
  };

  const slideRight = () => {
    const slider = document.getElementById(`slider-${filter.url}`);
    if (slider) slider.scrollLeft += 600;
  };

  return (
    <div className="relative space-y-0.5 md:space-y-2 px-4">
      <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {filter.title}
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
        id={`slider-${filter.url}`}
        className="flex overflow-x-scroll scrollbar-hide scroll-type-x mandatory scroll-smooth whitespace-nowrap space-x-1 md:space-x-2.5 lg:space-x-5"
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="scroll-snap-align-start w-[350px] min-w-[350px] "
          >
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRows;
