import { useEffect, useState } from "react";
import { sendRequest } from "../hooks/use-request";

import { NewContent } from "../types/new-content";
import ContentRows from "../components/content/contentRows";
import {
  PlayIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Video from "../components/content/video";
import Navbar from "../layouts/nav";
import { useNavigate } from "react-router-dom";

enum filters {
  trending = "trending/all",
  popular = "popular/movie",
  topRated = "top_rated/movie",
  upcoming = "upcoming/movie",
}

const Movies = () => {
  const [, setContent] = useState<NewContent>();
  const navigate = useNavigate();

  const getTop10Content = async (): Promise<void> => {
    try {
      const data = await sendRequest({
        port: 3003,
        url: "/api/trending/movie",
        method: "GET",
      });
      setContent(data);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  useEffect(() => {
    getTop10Content();
  }, []);

  function handlePlayMainVideoClick(): void {
    navigate(`/main-movie/play`);
  }

  return (
    <>
      <Navbar />
      <div className="z-60 -mt-36 bg-gradient-to-t from-black to-gray-900">
        <div style={{
        transform: "scale(1.5)",  // This scales the player by 130%
        transformOrigin: "center", // Keeps the scaling centered
        width: "100%",
        height: "80vh",
        overflow: "hidden"
        }}
        className="z-60 -mt-36 sm:-mt-50  ">
          {<Video movieId={"1241674"} type={"movie"} />}
        </div>
        <div className="absolute top-[50%] ml-4 md:ml-16">
          <p className=" text-white text-1xl md:text-3xl h-full lg:text-8xl font-black drop-shadow-xl">
            The Last Breath
          </p>
          {/* <p className="text-white text-[8px] md:text-sm mt-3 md:-mt8 w-[90%] md:w-[60%] lg:w-[50%] drop-shadow-xl">
          A group of old college friends reunite on a diving trip to the Caribbean, investigating the wreck of a World War II battleship and find themselves trapped in an underwater labyrinth of rusty metal surrounded by large white sharks.
          </p> */}
          <div className="flex gap-3 flex-row items-center mt-3 md:mt-4">
            <button
              onClick={handlePlayMainVideoClick}
              className="bg-white flex text-black sm:w-[100px] lg:w-[140px] py-1 md:py-2 px-2 md:px-4 font-bold text-sm lg:text-xl rounded-lg hover:bg-[#e6e6e6]"
            >
              <PlayIcon width={25} height={25} className="mr-2" />
              Play
            </button>
            <button className="bg-white bg-opacity-30 flex text-white lg:w-auto py-1 md:py-2 px-2 md:px-4 text-sm lg:text-xl rounded-lg hover:bg-[#b7b1b1] hover:bg-opacity-20">
              <InformationCircleIcon width={25} height={25} className="me-2 " />
              More Info
            </button>
          </div>
        </div>
        <div className="pb-40 mt-15">
          <ContentRows
            filter={{ url: filters.trending, title: "Trending Now" }}
          />
          <ContentRows filter={{ url: filters.topRated, title: "Top Rated" }} />
          <ContentRows filter={{ url: filters.popular, title: "Popular" }} />
          <ContentRows filter={{ url: filters.upcoming, title: "Upcoming" }} />
        </div>
      </div>
    </>
  );
};

export default Movies;
