import React, { useState } from 'react';
import HeaderLandingPage from '../layouts/header-landing-page';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../hooks/use-request';


const ForgotPasswordPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<'email' | 'sms'>('email');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false); // New state to handle the "Email Sent" view
    const navigate = useNavigate();

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value as 'email' | 'sms');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            if (selectedOption === 'email') {
                await sendRequest ({
                  url: '/api/auth/reset-password',
                  method: 'POST',
                  body: {
                    email,
                  }
                });
                setEmailSent(true); // Set the state to show the "Email Sent" screen
            } else {
                setMessage('SMS reset functionality is not implemented yet.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (emailSent) {
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
                        <div className="bg-white text-black p-8 shadow-md w-full max-w-sm text-center">
                            <h1 className="text-xl text-gray-800 text-left font-semibold mb-4">Email Sent</h1>
                            <p className="mb-4 text-left text-sm">
                                An email with instructions on how to reset your password has been sent to {email}.
                                Check your spam or junk folder if you don’t see the email in your inbox.
                            </p>
                            <p className="text-sm text-left">
                                If you no longer have access to this email account, please <a href="#" className="text-blue-500 hover:underline">contact us</a>.
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
    }

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

                        <form onSubmit={handleSubmit}>
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700 transition"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Sending...' : 'Email Me'}
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
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                            >
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
                                                <option value="+972">+972</option>
                                            </select>
                                            <input
                                                type="tel"
                                                placeholder="Phone number"
                                                className="w-full py-3 px-4 border border-gray-300 rounded-r"
                                                required
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded font-bold hover:bg-blue-700 transition"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Sending...' : 'Text Me'}
                                    </button>
                                </>
                            )}
                        </form>

                        {message && <p className="mt-4 text-center text-sm">{message}</p>}

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
