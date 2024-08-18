import React, { useState } from 'react';
import HeaderLandingPage from '../../layouts/header-landing-page';
import Logout from '../logout';

const PlanSelection: React.FC<{ onNext: () => void }> = ({ onNext }) => {

  const [selectedPlan, setSelectedPlan] = useState('10341'); // Default to Premium

  const plans = [
    { id: '10339', name: 'Basic', quality: '720p', price: '32.90', background: 'bg-gradient-to-br from-purple-700 to-blue-800' },
    { id: '10340', name: 'Standard', quality: '1080p', price: '54.90', background: 'bg-gradient-to-br from-purple-600 to-blue-700' },
    { id: '10341', name: 'Premium', quality: '4K + HDR', price: '69.90', background: 'bg-gradient-to-br from-purple-800 to-red-600' },
  ];
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

      <div style={{ minHeight: '80vh' }} className=" bg-white p-4">
      <div className="container mx-auto px-4 py-8 ">
        <h2 className="text-sm text-gray-600 mb-2">STEP 2 OF 4</h2>
        <h1 className="text-3xl font-semibold mb-6">Choose the plan that's right for you</h1>
        
        <div className="space-y-4 flex space-x-2 justify-center ">
          {plans.map((plan) => (
            <div 
                key={plan.id} 
                className={`w-1/3 border border-gray-200 rounded-lg shadow transition-all duration-250 ease-in-out ${selectedPlan === plan.id ? 'ring-2 ring-gray-400' : ' p-2'}`}
                onClick={() => setSelectedPlan(plan.id)}

              >
                <div className={`${plan.background} p-8 rounded-lg  relative`}>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-white opacity-80">{plan.quality}</p>
                  {selectedPlan === plan.id && (
                    <svg className="absolute bottom-2 right-2 w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>


                <div className="p-4">
              <ul className="space-y-2 text-sm  ">
                <li className=" flex flex-col border-b border-gray-200 mt-5 ">
                  <span>Monthly price</span>
                  <span>₪{plan.price}</span>
                </li>
                <li className="flex flex-col border-b border-gray-200 mt-5">
                  <span>Video and sound quality</span>
                  <span>{plan.name === 'Premium' ? 'Best' : plan.name === 'Standard' ? 'Great' : 'Good'}</span>
                </li>
                <li className="flex flex-col border-b border-gray-200 mt-5">
                  <span>Resolution</span>
                  <span>{plan.quality}</span>
                </li>
                {plan.name === 'Premium' && (
                  <li className="flex flex-col border-b border-gray-200 mt-5">
                    <span>Spatial audio (immersive sound)</span>
                    <span>Included</span>
                  </li>
                )}
                <li className="flex flex-col border-b border-gray-200 mt-5">
                  <span>Supported devices</span>
                  <span>TV, computer, mobile phone, tablet</span>
                </li>
                <li className="flex flex-col border-b border-gray-200 mt-5">
                  <span>Devices your household can watch at the same time</span>
                  <span>{plan.name === 'Premium' ? '4' : plan.name === 'Standard' ? '2' : '1'}</span>
                </li>
                <li className="flex flex-col mt-5 ">
                  <span>Download devices</span>
                  <span>{plan.name === 'Premium' ? '6' : plan.name === 'Standard' ? '2' : '1'}</span>
                </li>
              </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 mt-6 mb-4">
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
        </p>
        <p className="text-sm text-gray-600 mb-8">
          Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.
        </p>

        <div className="flex justify-center ">
            <button 
              onClick={onNext} 
              className="bg-red-600 text-white font-semibold py-3 px-6 rounded w-full md:w-auto hover:bg-red-700 transition duration-300 flex items-center justify-center"
            >
              Next
            </button>
          </div>
      </div>
      </div>
    </>
  );
};

export default PlanSelection;