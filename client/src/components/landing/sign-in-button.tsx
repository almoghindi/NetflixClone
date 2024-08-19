import React from "react";
import { useNavigate } from "react-router-dom";


const SignInButton: React.FC = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/login");
    }
    return (
    <button onClick={handleNavigate} className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-2 px-3 rounded">
      Sign In
    </button>
  );    
};

export default SignInButton