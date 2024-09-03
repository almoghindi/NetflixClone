import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MovieCard from "./movieCard";

const MyListPage: React.FC = () => {
  const myList = useSelector((state: RootState) => state.myList);

  return (
    <div className="px-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 min-h-screen">
      <h1 className="text-white text-2xl sm:text-3xl font-semibold mt-6 sm:mt-8 md:mt-10">
        My List
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 gap-8 sm:gap-6 md:gap-16 mt-4 sm:mt-6 md:mt-8">
        {[...myList.movies, ...myList.tvShows].map((movie, index) => (
          <div 
            key={index} 
            className="
              relative
              w-full
              transition-transform duration-300 ease-in-out
              transform hover:scale-105
              hover:z-10
            "
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListPage;