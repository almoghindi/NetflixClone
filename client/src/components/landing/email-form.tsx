import React from "react";
import { useNavigate } from "react-router-dom";

const EmailForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-8 flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        placeholder="Email address"
        className="flex-grow py-3 px-4 bg-black bg-opacity-50 border border-gray-600 rounded text-white"
        required
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded"
      >
        Get Started &gt;
      </button>
    </form>
  );
};

export default EmailForm;
