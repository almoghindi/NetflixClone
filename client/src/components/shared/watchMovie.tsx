import Video from "./video";

const WatchMovie = (movieId: Number) => {
  return (
    <div>
      <Video movieId={movieId} />
    </div>
  );
};

export default WatchMovie;
