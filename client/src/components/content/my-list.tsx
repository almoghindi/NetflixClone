import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sendRequest } from "../../hooks/use-request";
import MovieCard from "./movieCard";
import { NewContent } from "../../types/new-content";

interface MovieProps {
  id: string;
  profile_id: string;
  content_id: string;
  createdAt: string;
  updatedAt: string;
}

const MyListPage = () => {
  const [myList, setMyList] = useState<MovieProps[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const getMyList = async (): Promise<void> => {
    try {
      if (!user?.profileId) {
        throw new Error("Profile ID is missing.");
      }

      const data = await sendRequest({
        url: `/api/profile/${user.profileId}/items`,
        method: "GET",
        port: 3002,
      });

      console.log("Response data:", data);

      if (Array.isArray(data)) {
        setMyList(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching my list:", error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    getMyList();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="px-10 md:px-12 min-h-screen">
      <h1 className="text-white text-3xl font-semibold mt-20">My List</h1>
      <div className="grid grid-cols-2 gap-1 p-20 sm:grid-cols-4">
        {myList.map((movie) => (
          <div key={movie.id} className="me-20">
            <MovieCard movie={{ id: movie.content_id }} /> {/* Assuming MovieCard accepts id as prop */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListPage;
