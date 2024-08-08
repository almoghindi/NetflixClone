import React, { useState } from "react";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import HomePage from "./pages/home-page";
import Login from "./pages/login-page";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <HomePage />
        {!isLoggedIn && <Login />}
      </main>
      <Footer />
    </div>
  );
};
export default App;
