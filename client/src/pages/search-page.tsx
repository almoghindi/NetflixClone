import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendRequest } from "../hooks/use-request";
import { NewContent } from "../types/new-content";
import MovieCard from "../components/content/movieCard";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const [content, setContent] = useState<NewContent[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

        console.log(data);

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
    <div className="pt-16 px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Add padding-top to account for fixed navbar */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Search Results for "{query}"</h1>
      <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-2' : 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-4 sm:gap-6`}>
        {content && content.map((movie, index) => (
          <div className="flex justify-center" key={index}>
            <MovieCard movie={movie} isMobile={isMobile} />
          </div>
        ))}
      </div>
      {content.length === 0 && (
        <p className="text-white text-center mt-8">No results found for "{query}". Please try a different search term.</p>
      )}
    </div>
  );
};

export default SearchPage;