import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MovieCard from "./movieCard";

const MyListPage = () => {
  const myList = useSelector((state: RootState) => state.myList);
  return (
    <div className="px-10 md:px-12 min-h-screen">
      <h1 className="text-white text-3xl font-semibold mt-10">My List</h1>
      <div className="grid grid-cols-2 gap-8 p-20 sm:grid-cols-4">
        {[...myList.movies, ...myList.tvShows].map((movie, index) => (
          <div key={index} className="me-20">
            <MovieCard movie={movie} />
            {/* Assuming MovieCard accepts the full movie object */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListPage;
