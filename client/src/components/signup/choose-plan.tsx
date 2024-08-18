import React from 'react';
import HeaderLandingPage from '../../layouts/header-landing-page';
import Logout from '../logout';


const ChoosePlan: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (

    <>
      <header className="bg-white border-b border-gray-200 py-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <HeaderLandingPage />
          <div className='text-gray-600 font-bold text-md'>
          <Logout />

          </div>
        </div>
      </header>

    <div style={{ minHeight: '80vh' }} className="flex flex-col items-center justify-center  bg-white p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-2 border-red-600 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">STEP 1 OF 3</p>
        <h1 className="text-3xl font-semibold mb-6">Choose your plan.</h1>
        <ul className="text-left space-y-2 text-gray-800 mb-6">
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            No commitments, cancel anytime.
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Everything on Netflix for one low price.
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Unlimited viewing on all your devices.
          </li>
        </ul>
        <button 
          onClick={onNext} 
          className="bg-red-600 text-white font-semibold py-3 px-6 rounded w-full md:w-auto hover:bg-red-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default ChoosePlan;
