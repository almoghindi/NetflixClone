import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendRequest } from "../hooks/use-request";
import { NewContent } from "../types/new-content";
import MovieCard from "../components/content/movieCard";


const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const [content, setContent] = useState<NewContent[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        return;
      }

      try {
        const url = `/api/search/${query}`;
        const data = await sendRequest({
          port: 3003,
          url: url,
          method: "GET",
        });

        if (data.content.results) {
          setContent(data.content.results);
          console.log(data.content);
        } else {
          console.log(data.message || "No results found.");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="pt-16">
      {" "}
      {/* Add padding-top to account for fixed navbar */}
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
        {content &&
          content.map((movie, index) => (
            <div className="mt-6" key={index}>
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
