import React, { useState } from 'react';
import Header from './layouts/header';
import Footer from './layouts/footer';
import HomePage from './pages/home-page';
import Login from './pages/login-page';

const App: React.FC = () => {

  return (
    <div>
      <Header />
      <main>
        <HomePage />
        <Login  />
      </main>
      <Footer />
    </div>
  );
};

export default App;
