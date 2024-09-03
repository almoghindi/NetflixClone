import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }, [query, navigate]);

  const handleIconClick = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        onSubmitCapture={submitHandler}
        name="q"
        id="q"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className={`text-white bg-black ${
          isOpen ? "w-60 bg-black opacity-100 z-20" : "w-0 opacity-0"
        } transition-all duration-300 ease-in-out pl-10 pr-2 py-1 border absolute top-0 right-0   z-10`}
        placeholder="Title, people, genres"
      />
      <MagnifyingGlassIcon
        className={`h-5 w-5 text-white cursor-pointer absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-20 ${
          isOpen ? "right-52" : "right-2"
        }`}
        onClick={handleIconClick}
      />
    </div>
  );
}

export default SearchBar;
