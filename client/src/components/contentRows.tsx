import React, { useEffect, useState } from "react";

import { sendRequest } from "../hooks/use-request";
import { Content } from "../types/content";
const ContentRows = () => {
  const [movies, setMovies] = useState<Content[]>([]);

  let movie: Content;

  const showMovies = async (): Promise<void> => {
    try {
      const content: Content[] = await sendRequest({
        url: "/api/movies",
        method: "GET",
      });
      setMovies(content);
      console.log(content + "h ");
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    showMovies();
  }, []);
  return (
    <>
      {movies &&
        movies.map((movie, index) => (
          <div className="w-100">
            <h2 className="text-white font-bold md:text-xl p-4">
              {movie.title}
            </h2>
            <div className="relative flex items-center">
              <div
                key={index}
                className="w-[160px] sm::w-[200px] md::w-[240px] lg::w-[280px] inline-block cursor-pointer relative p-2 "
              >
                <img src={movie.img} alt="" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ContentRows;
