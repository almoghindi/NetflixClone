import React, { useEffect, useState } from "react";
import ContentRows from "../components/content/contentRows";
import { sendRequest } from "../hooks/use-request";
import { NewContent } from "../types/new-content";
import { InformationCircleIcon, PlayIcon } from "@heroicons/react/24/outline";
import Video from "../components/content/video";
import Navbar from "../layouts/nav";

const TvShows = () => {
  const [tvShows, setTvShows] = useState<NewContent[]>([]);
  const [selectedShow, setSelectedShow] = useState<NewContent | null>(null);

  const getTvShows = async (): Promise<void> => {
    try {
      const response = await sendRequest({
        port: 3003,
        url: "/api/tvshows",
        method: "GET",
      });
      const data = response.content;

      if (Array.isArray(data)) {
        setTvShows(data);
        setSelectedShow(data[0]); // Automatically select the first show for display
        console.log(data[0]);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  useEffect(() => {
    getTvShows();
  }, []);

  const handlePlayMainVideoClick = () => {
    if (selectedShow) {
      // Add functionality to navigate or play the selected show
      console.log("Playing:", selectedShow.title);
    }
  };

  return (
    <>
      <div className="z-60 -mt-36 bg-gradient-to-t from-black to-gray-900">
        <div
          style={{
            transform: "scale(1.5)",
            transformOrigin: "center",
            width: "100%",
            height: "80vh",
            overflow: "hidden",
          }}
          className="z-60 -mt-36 sm:-mt-50"
        >
          {selectedShow && <Video movieId={selectedShow.id.toString()} />}
        </div>
        <div className="absolute top-[50%] ml-4 md:ml-16">
          <p className="text-white text-4xl md:text-3xl h-full w-[100%] lg:text-6xl font-bold drop-shadow-xl">
            {selectedShow?.name}
          </p>
          <p className="text-white text-[8px] md:text-sm mt-3 md:-mt8 w-[90%] md:w-[60%] lg:w-[50%] drop-shadow-xl">
            {selectedShow?.overview}
          </p>
          <div className="flex gap-3 flex-row items-center mt-3 md:mt-4">
            <button
              onClick={handlePlayMainVideoClick}
              className="bg-white flex text-black sm:w-[100px] lg:w-[140px] py-1 md:py-2 px-2 md:px-4 font-bold text-sm lg:text-xl rounded-lg hover:bg-[#e6e6e6]"
            >
              <PlayIcon width={25} height={25} className="mr-2" />
              Play
            </button>
            <button
              onClick={() => console.log("More Info Clicked")}
              className="bg-white bg-opacity-30 flex text-white lg:w-auto py-1 md:py-2 px-2 md:px-4 text-sm lg:text-xl rounded-lg hover:bg-[#b7b1b1] hover:bg-opacity-20"
            >
              <InformationCircleIcon width={25} height={25} className="me-2" />
              More Info
            </button>
          </div>
        </div>
        <div className="pb-40 mt-15">
          {tvShows.length > 0 && (
            <>
              <ContentRows filter={{ url: "tvshows", title: "TV Shows" }} />
              <ContentRows filter={{ url: "tvshows", title: "Tranding" }} />
              <ContentRows filter={{ url: "tvshows", title: "Top Rated" }} />
              <ContentRows filter={{ url: "tvshows", title: "New" }} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TvShows;
