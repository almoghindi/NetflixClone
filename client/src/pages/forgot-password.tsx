import React, { useState } from 'react';
import HeaderLandingPage from '../layouts/header-landing-page';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<'email' | 'sms'>('email');
    const navigate = useNavigate();

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value as 'email' | 'sms');
    };
    return (
        <>
            <HeaderLandingPage />
          <div className="min-h-screen">
            <div className="flex items-center justify-end absolute top-0 right-0 m-6 mr-8">
                <button onClick={() => navigate("/login")} className="flex justify-start text-red-600 hover:text-red-700 hover:underline font-semibold text-ms ">
                    Sign In
                </button>
            </div>
    
            <div className="flex-grow flex items-center justify-center w-full">
              <div className="bg-white text-black p-8 shadow-md w-full max-w-sm">
                <h1 className="text-2xl text-gray-700 font-semibold mb-4">Update password, email or phone</h1>
                <p className="mb-4">How would you like to reset your password?</p>
    
                <form>
                  <div className="mb-4 ml-8">
                    <label className="flex items-center ">
                      <input
                        type="radio"
                        name="resetMethod"
                        value="email"
                        checked={selectedOption === 'email'}
                        onChange={handleOptionChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center mt-2">
                      <input
                        type="radio"
                        name="resetMethod"
                        value="sms"
                        checked={selectedOption === 'sms'}
                        onChange={handleOptionChange}
                        className="mr-2"
                      />
                      Text Message (SMS)
                    </label>
                  </div>
    
                  {selectedOption === 'email' && (
                    <>
                      <p className="mb-4 text-sm">We will send you an email with instructions on how to reset your password.</p>
                      <div className="mb-6">
                        <input
                          type="email"
                          placeholder="name@example.com"
                          className="w-full py-3 px-4 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700 transition"
                      >
                        Email Me
                      </button>
                    </>
                  )}
    
                  {selectedOption === 'sms' && (
                    <>
                      <p className="mb-4 text-sm">
                        We will text you a verification code to reset your password. Message and data rates may apply.
                      </p>
                      <div className="mb-6">
                        <div className="flex">
                          <select
                            className="bg-white border border-gray-300 rounded-l px-4 py-3"
                            required
                          >
                            {/* Add country code options */}
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+972">+972</option>
                            {/* Add more country codes as needed */}
                          </select>
                          <input
                            type="tel"
                            placeholder="Phone number"
                            className="w-full py-3 px-4 border border-gray-300 rounded-r"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded font-bold hover:bg-blue-700 transition"
                      >
                        Text Me
                      </button>
                    </>
                  )}
                </form>
    
                <p className="mt-4 text-blue-600 text-sm hover:underline cursor-pointer">
                  I don't remember my email or phone.
                </p>
              </div>
            </div>
    
            <div className="text-center text-gray-500 text-xs mt-4">
              <p className="mb-2">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                <a href="#" className="text-blue-500 hover:underline">Learn more</a>.
              </p>
            </div>
    
          </div>
        </>
      );
    };

export default ForgotPasswordPage;
