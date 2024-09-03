import React, { useState, useEffect } from 'react';
import { sendRequest } from '../../hooks/use-request';
import ReactPlayer from 'react-player';

interface TvShow {
  name: string;
  overview: string;
  // Add other properties as needed
}

interface Video {
  key: string;
  name: string;
  type: string;
}

interface EpisodeProps {
  movieId: string;
}

const WatchEpisode: React.FC<EpisodeProps> = ({ movieId }) => {
  const [tvShow, setTvShow] = useState<TvShow | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchTvShowData = async () => {
      try {
        const tvShowResponse = await sendRequest({ url: `/redis/api/tv/${movieId}/details`, method: 'GET', port: 3003 });
        const videosResponse = await sendRequest({ url: `/redis/api/tv/${movieId}/videos`, method: 'GET', port: 3003 });

        setTvShow(tvShowResponse.content);
        setVideos(videosResponse.content.results);
        setSelectedVideo(videosResponse.content.results[0]);
      } catch (error) {
        console.error('Error fetching TV show data:', error);
      }
    };

    fetchTvShowData();
  }, [movieId]);

  if (!tvShow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-t from-black to-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{tvShow.name}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">

            {selectedVideo && (
              <div className="relative aspect-w-16 aspect-h-9 mb-4">
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${selectedVideo.key}`}
                  playing={true}
                  loop
                  muted
                  width="100%"
                  height={"80vh"}
                  controls={false}
                ></ReactPlayer>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Next Episode
              </button>
              <div className="flex space-x-2">
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-lg mb-4">{tvShow.overview}</p>
          </div>
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Episodes</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Season 1</h3>
                <select className="bg-gray-700 text-white rounded px-2 py-1">
                  <option>Season 1</option>
                  {/* Add more seasons as needed */}
                </select>
              </div>
              <ul className="space-y-4">
                {videos.map((video, index) => (
                  <li key={video.key} className="flex items-center space-x-4">
                    <span className="text-2xl font-bold">{index + 1}</span>
                    <div>
                      <h4 className="font-semibold">{video.name}</h4>
                      <p className="text-sm text-gray-400">{video.type}</p>
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
