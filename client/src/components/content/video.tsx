import React, {  useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getTrailer } from "../../utils/trailerUtils";

export interface VideoProps {
  movieId: string ;
  type: string;
}

const Video: React.FC<VideoProps> = ({ movieId, type }) => {
  const [trailer, setTrailer] = useState<string | null>(null);

  console.log(movieId,"type", type)
  useEffect(() => {
    const fetchTrailer = async () => {
      if (movieId) {
        const trailerUrl = await getTrailer(movieId, type);
        setTrailer(trailerUrl);
      }
    };

    fetchTrailer();
  }, [movieId, type]);

  return (
    <div className="z-60 ">
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