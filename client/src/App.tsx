import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./layouts/footer";

import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";

import SignUpPageForm from "./components/signup/signup-form-page";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import SignupFlow from "./pages/signup-flow";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupFlow />} />
         <Route path="/signup/regform" element={<SignUpPageForm onNext={function (): void {
          throw new Error("Function not implemented.");
        } } />} /> 
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

      </Routes>
     <Footer />
    </Router>

  );
};
export default App;
