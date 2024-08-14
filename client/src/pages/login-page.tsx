import React from 'react';
import AuthForm from "../components/auth-form";
import HeaderLandingPage from '../layouts/header-landing-page';
import BackGroundLadingPage from '../assets/img/landing-page-assets/landing-page-background.jpg';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen  bg-center" style={{backgroundImage: `url(${BackGroundLadingPage})`}}>
      <div className="min-h-screen bg-black bg-opacity-60">
        <header className="p-4">
          <HeaderLandingPage />
        </header>

        <main className="container mx-auto px-4 py-4 flex justify-center items-center">
          <div className="bg-black bg-opacity-70 p-16 rounded-lg max-w-md w-full">
            <AuthForm />
          </div>
        </main>

      
      </div>
    </div>
  );
};

export default LoginPage;