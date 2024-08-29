import React from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../store/slices/authSlice";
import { sendRequest } from "../hooks/use-request";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogOutClick = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!userId) {
        throw new Error("User not found. Please logIn again.");
      }

      await sendRequest({
        port: 3001,
        url: "/api/auth/logout",
        method: "POST",
        body: { userId, refreshToken },
      });

      dispatch(logoutSuccess());

      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/login");
    } catch (error) {
      new Error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div
      className="block px-4 py-2 text-sm text-white"
      onClick={handleLogOutClick}
    >
      <div className="block px-4 py-2 text-sm text-white-700 data-[focus]:bg-gray-100 data-[focus]:text-white flex mr-2">
        <div className="hover:underline">Sign Out</div>
      </div>
    </div>
  );
};

export default Logout;
