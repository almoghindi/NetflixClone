import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../store/slices/authSlice";
import { sendRequest } from "../hooks/use-request";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const handleLogOutClick = async () => {
    try {


      if (user === null) {
        throw new Error("User not found. Please logIn again.");
      }

      await sendRequest({
        port: 3001,
        url: "/api/auth/logout",
        method: "POST",
        body: { userId: user?.userId },
      });

      localStorage.removeItem("user");
      dispatch(logoutSuccess());


      
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
