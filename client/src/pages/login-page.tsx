import React from 'react';
import AuthForm from "../components/auth-form";
import HeaderLandingPage from '../layouts/header-landing-page';
import BackGroundLadingPage from '../assets/img/landing-page-assets/landing-page-background.jpg';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${BackGroundLadingPage})`}}>
      <div className="min-h-screen bg-black bg-opacity-60">
        <header className="p-4">
          <HeaderLandingPage />
        </header>

        <main className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="bg-black bg-opacity-70 p-16 rounded-lg max-w-md w-full">
            <AuthForm />
          </div>
        </main>

        <footer className="bg-black text-gray-500 py-8">
          <div className="container mx-auto px-4">
            <p className="mb-6">Questions? Contact us.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              <a href="#" className="hover:underline">FAQ</a>
              <a href="#" className="hover:underline">Help Center</a>
              <a href="#" className="hover:underline">Terms of Use</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Cookie Preferences</a>
              <a href="#" className="hover:underline">Corporate Information</a>
            </div>
            <select className="bg-black text-gray-500 border border-gray-600 p-1 rounded">
              <option value="en">English</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;