import MovieCard from "./movieCard";
import { NewContent } from "../../types/new-content";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sendRequest } from "../../hooks/use-request";

const MyListPage = () => {
  const myList = useSelector((state: RootState) => state.myList.movies);

  // const getMyList = async (): Promise<void> => {
  //   try {
  //     console.log(userId);
  //     const data = await sendRequest({
  //       url: `/api/${userId}/items`,
  //       method: "GET",
  //       port: 3003,
  //     });
  //     setMovies(data.content);
  //   } catch (error) {
  //     new Error(error instanceof Error ? error.message : "An error occurred");
  //   }
  // };

  return (
    <>
      <div className="px-10 md:px-12  min-h-screen ">
        <h1 className="text-white text-3xl font-semibold mt-20">My List</h1>
        <div className="grid grid-cols-2 gap-1 p-20 sm:grid-cols-4 ">
          {myList.map((movie: NewContent) => (
            <div className="me-20">
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListPage;
