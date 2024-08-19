import React, { useState } from "react";
import SignUpPage from "../components/signup/signup-page";
import SignUpPageForm from "../components/signup/signup-form-page";
import ChoosePlan from "../components/signup/choose-plan";
import PlanSelection from "../components/signup/plan-selection";

const SignupFlow: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <SignUpPage onNext={handleNextStep} />}
      {step === 2 && <SignUpPageForm onNext={handleNextStep} />}
      {step === 3 && <ChoosePlan onNext={handleNextStep} />}
      {step === 4 && <PlanSelection onNext={handleNextStep} />}
    </>
  );
};

export default SignupFlow;
