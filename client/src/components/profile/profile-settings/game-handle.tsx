import React, { useState } from "react";

const GameHandle: React.FC = () => {
  const [gameHandle, setGameHandle] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Validate length and update state
    if (value.length <= 16) {
      setGameHandle(value);
      setError("");
    } else {
      setError("Game handle must be 16 characters or less.");
    }
  };

  return (
    <div>
      <h2 className="text-sm sm:text-base mb-2">Game Handle:</h2>
      <p className="text-xs sm:text-sm text-gray-400 mb-3">
        Your handle is a unique name that'll be used for playing with other
        Netflix members across all Netflix Games. Learn more
      </p>
      <div className="relative mb-2">
        <input
          type="text"
          value={gameHandle}
          onChange={handleInputChange}
          placeholder="Create Game Handle"
          maxLength={16}
          className="bg-zinc-700 text-white p-2 rounded w-full text-sm sm:text-base"
        />
        <span className="absolute right-0 top-full text-xs text-gray-400 mt-1">
          {gameHandle.length}/16
        </span>
      </div>
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}{" "}
      {/* Error message */}
    </div>
  );
};

export default GameHandle;
