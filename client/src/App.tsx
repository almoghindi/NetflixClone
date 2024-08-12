import React, { useState } from "react";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import HomePage from "./pages/home-page";
import Login from "./pages/login-page";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <HomePage />
      <Login />
      <Footer />
    </>
  );
};
export default App;
