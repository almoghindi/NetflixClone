import React from "react";
import HeaderLandingPage from "../layouts/header-landing-page";
import { useNavigate } from "react-router-dom";


const SignUpPage: React.FC = () => {
    const navigation = useNavigate();
    
  return (
    <div style={{ minHeight: '80vh' }} className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 py-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <HeaderLandingPage />
          <a href="/login" className="text-gray-600 font-semibold text-medium">
            Sign In
          </a>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="flex justify-center space-x-4 mb-4 w-64">
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png"
            alt=""
          />
        </div>

        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-2">
          Finish setting up your <br /> account
        </h1>
        <p className="text-lg text-center text-gray-700 mb-4">
          Netflix is personalized for you.
          <br />
          Create a password to start watching <br /> Netflix.
        </p>
        <button onClick={() => navigation("/signup/regform")} className="bg-red-600 hover:bg-red-600 text-white font-bold py-3 px-8 rounded w-full max-w-sm">
          Next
        </button>
      </main>
    </div>
  );
};

export default SignUpPage;
