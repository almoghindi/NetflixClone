import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layouts/footer";

import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import SignUpPage from "./pages/signup-page";
import SignUpPageForm from "./pages/signup-form-page";

import SubscriptionPage from "./pages/subscription-page";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Header /> */}
      {/* <HeaderLandingPage /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/regform" element={<SignUpPageForm />} />
        <Route path="/subscriptions" element={<SubscriptionPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
