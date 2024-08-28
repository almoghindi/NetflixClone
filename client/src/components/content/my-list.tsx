

import MovieCard from "./movieCard";
import { NewContent } from "../../types/new-content";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Navbar from "../../layouts/nav";
const MyListPage = () => {
    const myList = useSelector((state: RootState) => state.myList.movies);
    

  return (
    <>
    <Navbar />

    <div className="px-10 md:px-12 mt-10 min-h-screen">
      <h1 className="text-white text-3xl font-semibold mb-20 mt-10  ">My List</h1>
      <div className="grid grid-cols-4 gap-4 p-20 ">
        {myList.map((movie : NewContent) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
    </>
  );
};

export default MyListPage;
