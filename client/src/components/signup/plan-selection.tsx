import React, { useState, useEffect } from "react";
import HeaderLandingPage from "../../layouts/header-landing-page";
import Logout from "../logout";
import { Plan, plans as fetchPlans } from "../../utils/plans";

interface PlanSelectionProps {
  selectedPlan: string;
  setSelectedPlan: (planId: string) => void;
  setSelectedPrice: (price: string) => void;
  onNext: () => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({
  onNext,
  selectedPlan,
  setSelectedPlan,
  setSelectedPrice,
}) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlansData = async () => {
      const plansData = await fetchPlans();
      setPlans(plansData);
    };

    fetchPlansData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <HeaderLandingPage />
          <Logout />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-sm text-gray-600 mb-2">STEP 2 OF 4</h2>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          Choose the plan that's right for you
        </h1>

        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border border-gray-200 rounded-lg shadow transition-all duration-250 ease-in-out ${
                selectedPlan === plan.type ? "ring-2 ring-gray-400" : ""
              }`}
              onClick={() => {
                setSelectedPlan(plan.type);
                setSelectedPrice(plan.price.toString());
              }}
            >
              <div className={`${plan.background} p-4 sm:p-6 rounded-t-lg relative`}>
                <h3 className="text-lg sm:text-xl font-bold text-white">{plan.type}</h3>
                <p className="text-sm text-white opacity-80">{plan.quality}</p>
                {selectedPlan === plan.type && (
                  <svg
                    className="absolute bottom-2 right-2 w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              <div className="p-4">
                <ul className="space-y-3 text-sm">
                  <PlanDetail label="Monthly price" value={`₪${plan.price}`} />
                  <PlanDetail 
                    label="Video and sound quality" 
                    value={plan.type === "Premium" ? "Best" : plan.type === "Standard" ? "Great" : "Good"} 
                  />
                  <PlanDetail label="Resolution" value={plan.quality} />
                  {plan.type === "Premium" && (
                    <PlanDetail label="Spatial audio (immersive sound)" value="Included" />
                  )}
                  <PlanDetail label="Supported devices" value="TV, computer, mobile phone, tablet" />
                  <PlanDetail 
                    label="Devices your household can watch at the same time" 
                    value={plan.type === "Premium" ? "4" : plan.type === "Standard" ? "2" : "1"} 
                  />
                  <PlanDetail 
                    label="Download devices" 
                    value={plan.type === "Premium" ? "6" : plan.type === "Standard" ? "2" : "1"} 
                  />
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mt-6 mb-4">
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mb-8">
          Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="bg-red-600 text-white font-semibold py-3 px-6 rounded w-full sm:w-auto hover:bg-red-700 transition duration-300"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

const PlanDetail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <li className="flex flex-col border-b border-gray-200 pb-2">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold">{value}</span>
  </li>
);

export default PlanSelection;