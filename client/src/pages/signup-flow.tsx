import React, { useState } from "react";
import SignUpPage from "../components/signup/signup-page";
import SignUpPageForm from "../components/signup/signup-form-page";
import ChoosePlan from "../components/signup/choose-plan";
import PlanSelection from "../components/signup/plan-selection";
import Payment from "../components/payment/payment";
import ChoosePayment from "../components/signup/choose-payment";
import PayPalSetup from "../components/payment/paypal-payment";

const SignupFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("10341"); // Default to Premium
  const [price, setPrice] = useState("20"); // Default to Premium
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePaymentMethodSelected = (method: string) => {
    setPaymentMethod(method);
    handleNextStep();
  }

  return (
    <>
      {step === 1 && <SignUpPage onNext={handleNextStep} />}
      {step === 2 && <SignUpPageForm onNext={handleNextStep} />}
      {step === 3 && <ChoosePlan onNext={handleNextStep} />}
      {step === 4 && (
        <PlanSelection
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          planPrice={price}
          setSelectedPrice={setPrice}
          onNext={handleNextStep}
        />
      )}
      {step === 5 && <ChoosePayment onPaymentMethodSelect={handlePaymentMethodSelected} />}
      {step === 6 &&
        paymentMethod === "Credit or Debit Card" && (
          <Payment selectedPlan={selectedPlan} setStep={setStep} />
        )}
      {step === 6 &&
        paymentMethod === "PayPal" && (
          <PayPalSetup selectedPlan={selectedPlan} PlanPrice={price} setStep={setStep} />
        )}
    </>
  );
};

export default SignupFlow;
