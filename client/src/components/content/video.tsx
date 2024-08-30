import React, {  useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getTrailer } from "../../utils/trailerUtils";

interface VideoProps {
  movieId:  string ;
}

const Video: React.FC<VideoProps> = ({ movieId }) => {
  const [trailer, setTrailer] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movieId) {
        const trailerUrl = await getTrailer(movieId);
        setTrailer(trailerUrl);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <div className="z-60">
      {trailer && (
        <ReactPlayer
          url={trailer}
          playing={true}
          loop
          muted
          width="100%"
          height={"100vh"}
          controls={false}
        />
      )}
    </div>
  );
};

export default Video;