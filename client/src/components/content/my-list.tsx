import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sendRequest } from "../../hooks/use-request";
import MovieCard, { MovieCardProps } from "./movieCard";

interface MovieProps {
  id: string;
  profile_id: string;
  content_id: string;
  type: string | null; // The type of content: "movie", "tv", or null
  createdAt: string;
  updatedAt: string;
}

const MyListPage = () => {
  const [myList, setMyList] = useState<MovieCardProps[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const getMyList = async (): Promise<void> => {
    try {
      if (!user?.profileId) {
        throw new Error("Profile ID is missing.");
      }

      // Fetch the list of saved items for the profile
      const data: MovieProps[] = await sendRequest({
        url: `/api/profile/${user.profileId}/items`,
        method: "GET",
        port: 3002,
      });

      console.log("Response data:", data);

      setMyList(data);
    } catch (error) {
      console.error(
        "Error fetching my list:",
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  useEffect(() => {
    getMyList();
  }, []);

  return (
    <div className="px-10 md:px-12 min-h-screen">
      <h1 className="text-white text-3xl font-semibold mt-10">My List</h1>
      <div className="grid grid-cols-2 gap-8 p-20 sm:grid-cols-4">
        {myList.map((movie, index) => (
          <div key={index} className="me-20">
            <MovieCard movie={movie} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListPage;
