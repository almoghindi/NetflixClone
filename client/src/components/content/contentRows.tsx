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

  const fetchContent = async (): Promise<void> => {
    try {
      const data = await sendRequest({
        url: `/redis/${filter.url}`,
        method: "GET",
        port: 3003,
      });


      if (filter.url === "trending/all" || filter.url === "tv" || filter.url === "trending/tv") {
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
          console.error("Expected an array but received:", data.content.results);
          setContent([]); // Clear content if not an array
        }
      }
    } catch (error) {
      console.error("Fetch content error:", error);
      setContent([]); // Clear content on error
    }
  };

  useEffect(() => {
    fetchContent();
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
      <p className="text-white text-xl md:text:xl lg-text-2xl xl:text-3xl font-semibold mb-4">
        {filter.title}
      </p>
      <div>
        <ChevronLeftIcon
          className="w-6 h-6 absolute left-0 text-white cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100"
          onClick={() => slideLeft(`slider-${filter.url}`)}
        />
        <ChevronRightIcon
          className="w-6 h-6 absolute text-white right-0 cursor-pointer mt-[4.5rem] opacity-50 hover:opacity-100"
          onClick={() => slideRight(`slider-${filter.url}`)}
        />
      </div>
      <div
        className="relative gap-2 flex items-center w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        id={`slider-${filter.url}`}
      >
        {content &&
          content.map((item, index) => (
            <div key={index}>
              <MovieCard movie={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContentRows;
