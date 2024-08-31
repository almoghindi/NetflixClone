import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { getTrailer } from "../../utils/trailerUtils";

const WatchTrailers = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movieId) {
        const trailer = await getTrailer(movieId);
        setTrailerUrl(trailer);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      {trailerUrl ? (
        <ReactPlayer
          url={trailerUrl}
          playing={true}
          loop
          muted
          width="100%"
          height={"100vh"}
          controls={false}
        />
      ) : (
        <p className="text-white text-xl">Loading trailer...</p>
      )}
    </div>
  );
};

export default WatchTrailers;