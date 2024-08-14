import React from 'react';
import { useLocation } from 'react-router-dom';
interface FooterProps {
  isBlack?: boolean;
}


const Footer: React.FC<FooterProps> = () => {

  const location = useLocation();
  let isBlack = true;
  let LoginPage = false;

  if (location.pathname === '/signup' || location.pathname === '/signup/regform') {
    isBlack = false;
  }

  if (location.pathname === '/login') {
    isBlack = true;
    LoginPage = true;
    
  }

  return (
    <footer className={`${isBlack ? 'bg-black text-white border-gray-800' : 'bg-gray-50 text-gray-500 border-gray-200'} py-4 border-t`}>
      <div className={`${LoginPage ? 'bg-black bg-opacity-60 py-4 ': ''}  `}/>
      <div className="container mx-auto px-4">
        <p className={`${isBlack ? 'text-white' : 'text-gray-500'} mb-4`}>Questions? Contact us.</p>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-sm ${isBlack ? 'text-white' : 'text-gray-500'}`}>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Netflix Shop</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
          <a href="#" className="hover:underline">Corporate Information</a>
        </div>
        <div className="mt-4">
          <select className={`${isBlack ? 'bg-black border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-500'} py-1 px-2 rounded`}>
            <option value="en">English</option>
            {/* Add more language options as needed */}
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
