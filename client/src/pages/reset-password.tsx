import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLandingPage from "../layouts/header-landing-page";
import { sendRequest } from "../hooks/use-request";

const ResetPasswordPage = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setMessage("Invalid or expired reset link");
    }
  }, [location]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await sendRequest({
        port: 8000,
        url: "/api/auth/reset-password-link",
        method: "POST",
        body: {
          token,
          newPassword,
        },
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={{ minHeight: "80vh" }} className="flex flex-col">
      <HeaderLandingPage /> //TODO: PUT THE MAIN PAGE HEADER.
      <div className="flex-grow p-6 bg-gray-100 shadow-xl">
        <h1 className="text-4xl font-black ml-5 mb-4">Change password</h1>
        <p className="mb-4 ml-5">
          Protect your account with a unique password at least 6 characters
          long.
        </p>
        <form onSubmit={handleSubmit} className="p-5 flex flex-col">
          <div className="mb-2">
            <input
              type="email"
              placeholder="Current Email"
              className="w-1/2 p-2 border rounded"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              required
            />
            <a href="#" className="text-blue-400 font-bold text-xs">
              <br />
              Forgot password?
            </a>
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New password (6-60 characters)"
              className="w-1/2 p-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              maxLength={60}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Re-enter new password"
              className="w-1/2 p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
