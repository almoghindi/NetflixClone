import React, { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { sendRequest } from "../../hooks/use-request";
import CheckoutForm from "./checkout-form";
import { Elements } from "@stripe/react-stripe-js";
import HeaderLandingPage from "../../layouts/header-landing-page";
import Logout from "../logout";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface publishableKey {
  publishableKey: string;
}
interface clientSecret {
  clientSecret: string;
}

interface PaymentProps {
  selectedPlan: string;
  setStep: (step: number) => void;
}

const Payment: React.FC<PaymentProps> = ({ selectedPlan, setStep }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    const fetchPublishableKey = async () => {
      sendRequest({
        port: 3004,
        url: "/api/payment/config",
        method: "GET",
      }).then(async (res: publishableKey) => {
        const { publishableKey } = res;
        console.log(publishableKey);
        setStripePromise(await loadStripe(publishableKey));
      });
    };
    const fetchClientSecret = async () => {
      sendRequest({
        port: 3004,
        url: "/api/payment/create-subscription",
        method: "POST",
        body: {
          plan: selectedPlan.toLocaleUpperCase(),
          userId: user?.id,
        },
      }).then(async (res: clientSecret) => {
        const { clientSecret } = res;
        console.log(clientSecret);
        setClientSecret(clientSecret);
      });
    };
    fetchPublishableKey();
    fetchClientSecret();
  }, [selectedPlan, user]);

  return (
    <>
      <header className="bg-white border-b border-gray-200 py-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <HeaderLandingPage />
          <div className="text-gray-600 font-bold text-md">
            <Logout />
          </div>
        </div>
      </header>
      <div className="bg-white">
        {stripePromise && clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm selectedPlan={selectedPlan} setStep={setStep} />
          </Elements>
        ) : (
          <div className="text-center">
            <p>Loading payment information...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
