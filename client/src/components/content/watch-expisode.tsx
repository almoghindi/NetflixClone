import React, { useState, useEffect } from "react";
import { sendRequest } from "../../hooks/use-request";
import ReactPlayer from "react-player";
import LikeButton from "../card/Like-button";
import ListButton from "../card/list-button";
import { TvProps } from "./contentRows";

interface Video {
  key: string;
  name: string;
  type: string;
}

interface EpisodeProps {
  movieId: string;
}

const WatchEpisode: React.FC<EpisodeProps> = ({ movieId }) => {
  const [tvShow, setTvShow] = useState<TvProps | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchTvShowData = async () => {
      try {
        const tvShowResponse = await sendRequest({
          url: `/redis/api/tv/${movieId}/details`,
          method: "GET",
          port: 3003,
        });
        const videosResponse = await sendRequest({
          url: `/redis/api/tv/${movieId}/videos`,
          method: "GET",
          port: 3003,
        });

        setTvShow(tvShowResponse.content);
        setVideos(videosResponse.content.results);
        setSelectedVideo(videosResponse.content.results[0]);
      } catch (error) {
        console.error("Error fetching TV show data:", error);
      }
    };

    fetchTvShowData();
  }, [movieId]);

  if (!tvShow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-t from-black to-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">{tvShow.name}</h1>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          <div className="w-full lg:w-2/3">
            {selectedVideo && (
              <div className="relative aspect-w-16 aspect-h-9 mb-4">
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${selectedVideo.key}`}
                  playing={true}
                  loop
                  muted
                  width="100%"
                  height={isMobile ? "40vh" : "80vh"}
                  controls={false}
                />
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base">
                Next Episode
              </button>
              <div className="flex space-x-2">
                <ListButton movie={tvShow} />
                <LikeButton movie={tvShow} />
              </div>
            </div>
            <p className="text-sm sm:text-lg mb-4">{tvShow.overview}</p>
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Episodes</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold">Season 1</h3>
                <select className="bg-gray-700 text-white rounded px-2 py-1 text-sm">
                  <option>Season 1</option>
                  {/* Add more seasons as needed */}
                </select>
              </div>
              <ul className="space-y-4">
                {videos.map((video, index) => (
                  <li key={video.key} className="flex items-center space-x-4">
                    <span className="text-xl sm:text-2xl font-bold">{index + 1}</span>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">{video.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{video.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchEpisode;