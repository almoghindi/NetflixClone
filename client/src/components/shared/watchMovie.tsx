import Video from "./video";

const WatchMovie = (movieId: number) => {
  return (
    <div>
      <Video movieId={movieId} />
    </div>
  );
};

export default WatchMovie;
