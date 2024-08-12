import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import HomePage from "./pages/home-page";
// import Login from "./pages/login-page";

const App: React.FC = () => {
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* {!isLoggedIn && <Login />} */}
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
