import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderLandingPage from "../../layouts/header-landing-page";
import Logout from "../logout";

interface LocationState {
    selectedPlan: string;
    PlanPrice: string;
}

const PurchaseSuccess: React.FC = () => {
    const location = useLocation();
    const { selectedPlan, PlanPrice } = location.state as LocationState;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <header className="bg-white border-b border-gray-200 py-0">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <HeaderLandingPage />
                    <div className="text-gray-600 font-bold text-md">
                        <Logout />
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-bold mb-4">Welcome to Netflix!</h1>
                    <p className="text-xl mb-6">Your {selectedPlan} plan is now active.</p>
                    <div className="bg-gray-100 rounded-md p-4 mb-6">
                        <p className="text-lg font-semibold">₪{PlanPrice}/month</p>
                        <p className="text-gray-600">{selectedPlan}</p>
                    </div>
                    <p className="mb-8">You can now start enjoying unlimited movies and TV shows.</p>
                    <Link to="/home" className="bg-red-600 text-white py-3 px-6 rounded-md font-bold hover:bg-red-700 transition duration-300">
                        Start Watching
                    </Link>
                </div>
            </main>
            <footer className="w-full p-4 text-center text-gray-500 text-sm">
                <p>© 2023 Netflix, Inc.</p>
            </footer>
        </div>
    );
};

export default PurchaseSuccess;