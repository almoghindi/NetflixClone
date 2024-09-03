import { useEffect, useState } from "react";
import { VideoResponse } from "../../types/video";
import ReactPlayer from "react-player";

const Video = ({ movieId }: { movieId: number }) => {
  const [trailer, setTrailer] = useState("");
  const tmbd_key = import.meta.env.VITE_TMDB_API_KEY as string;

  useEffect(() => {
    const getTrailer = async (movieId: number): Promise<void> => {
      console.log(tmbd_key + "TTT");
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tmbd_key}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const trailers = data.results.filter(
            (video: VideoResponse) =>
              video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailers.length > 0) {
            const trailerUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
            setTrailer(trailerUrl);
          } else {
            console.log("No trailer found for this movie.");
          }
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    };
    getTrailer(movieId);
  }, [movieId, tmbd_key]);

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
