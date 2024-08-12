import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import HomePage from "./pages/home-page";
import HeaderLandingPage from "./layouts/header-landing-page";
import LandingPage from "./pages/landing-page";
// import Login from "./pages/login-page";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
