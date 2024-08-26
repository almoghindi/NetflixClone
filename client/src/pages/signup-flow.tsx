import React, { useState } from "react";
import SignUpPage from "../components/signup/signup-page";
import SignUpPageForm from "../components/signup/signup-form-page";
import ChoosePlan from "../components/signup/choose-plan";
import PlanSelection from "../components/signup/plan-selection";
import Payment from "../components/payment/payment";
import ChoosePayment from "../components/signup/choose-payment";

const SignupFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("10341"); // Default to Premium

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <SignUpPage onNext={handleNextStep} />}
      {step === 2 && <SignUpPageForm onNext={handleNextStep} />}
      {step === 3 && <ChoosePlan onNext={handleNextStep} />}
      {step === 4 && (
        <PlanSelection
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          onNext={handleNextStep}
        />
      )}
      {step === 5 && <ChoosePayment onNext={handleNextStep} />}
      {step === 6 && <Payment selectedPlan={selectedPlan} setStep={setStep} />}
    </>
  );
};

export default SignupFlow;
