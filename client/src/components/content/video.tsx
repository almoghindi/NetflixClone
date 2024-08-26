import React, { useEffect, useState } from "react";

import ReactPlayer from "react-player";
import { sendRequest } from "../../hooks/use-request";

const Video = ({ movieId }: { movieId: number }) => {
  const [trailer, setTrailer] = useState("");

  const getTrailer = async (movieId: number): Promise<void> => {
    try {
      const data = await sendRequest({
        port: 8000,
        url: `/api/movies/${movieId}/trailer`,
        method: "GET",
      });

      if (data.trailerUrl) {
        setTrailer(data.trailerUrl);
      } else {
        console.log(data.message || "No trailer found for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    getTrailer(movieId);
  }, [movieId]);

  return (
    <div className="z-60  ">
      {trailer && (
        <ReactPlayer
          url={trailer}
          playing={true}
          loop
          muted
          width="100%"
          height={"80vh"}
          controls={false}
        />
      )}
      <p className="text-white text-3xl">{}</p>
    </div>
  );
};

export default Video;
