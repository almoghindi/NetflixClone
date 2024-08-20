import { useEffect, useState } from "react";
import { sendRequest } from "../hooks/use-request";

import { NewContent } from "../types/new-content";

import ContentRows from "../components/contentRows";
import {
  PlayIcon,
  InformationCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import Video from "../components/video";

enum filters {
  trending = "trending/all",
  popular = "popular/movie",
  topRated = "top_rated/movie",
  upcoming = "upcoming/movie",
}

export const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<NewContent>();

  const getTop10Content = async (): Promise<void> => {
    try {
      const data = await sendRequest({
        url: "/api/trending/movie",
        method: "GET",
      });

      setContent(data);
      // console.log(data.content);
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    getTop10Content();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePlay = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="z-60 -mt-36">
        {content && <Video movieId={content.content.id} />}
      </div>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {content?.content.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:-mt8 w-[90-%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {content?.content.overview}
        </p>
        <div className="flex gap-3 flex-row items-center mt-3 md:mt-4">
          <div className="flex gap-3 flex-row items-center mt-3 md:mt-4">
            <button className="bg-white flex text-black sm:w-[100px] lg:w-[140px] py-1 md:py-2 px-2 md:px-4 font-bold text-sm lg:text-xl  rounded-lg hover:bg-[#e6e6e6]">
              <PlayIcon width={25} height={25} className="mr-5" />
              Play
            </button>
          </div>
          <div className="flex gap-3 flex-row items-center mt-3 md:mt-4">
            <button
              onClick={handlePlay}
              className="bg-white bg-opacity-30 flex text-white sm:w-[100px] lg:w-auto py-1 md:py-2 px-2 md:px-4  text-sm lg:text-xl  rounded-lg hover:bg-[#b7b1b1] hover:bg-opacity-20"
            >
              <InformationCircleIcon width={25} height={25} />
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className="pb-40">
        <ContentRows
          filter={{ url: filters.trending, title: "Trending Now" }}
        />
        <ContentRows filter={{ url: filters.popular, title: "Popular" }} />
        <ContentRows filter={{ url: filters.topRated, title: "Top Rated" }} />
        <ContentRows filter={{ url: filters.upcoming, title: "UpComming" }} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden flex">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white text-lg z-50"
            >
              Close
            </button>
            <img
              className="h-120 w-80 "
              src={`https://image.tmdb.org/t/p/original${content?.content.poster_path}`}
              alt=""
            />
            <div className="block">
              <p className="text-white ms-12 p-3 mt-4 text-4xl text-bold">
                {content?.content.title}
              </p>
              <p className="text-white flex ms-12 p-3">
                {content?.content.release_date.trim().substring(0, 4)}
                {""}
                {"  |  "} {content?.content.vote_average}
                <StarIcon width={20} height={20} className="text-yellow-500" />
              </p>
              <p className="text-white ms-12 p-3 mt-20">
                {content?.content.overview}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
