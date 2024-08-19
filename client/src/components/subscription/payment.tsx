import React, { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { sendRequest } from "../../hooks/use-request";
import CheckoutForm from "./checkout-form";
import { Elements } from "@stripe/react-stripe-js";
interface publishableKey {
  publishableKey: string;
}
const Payment: React.FC = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  useEffect(() => {
    sendRequest({
      url: "/api/payment/config",
      method: "GET",
    }).then(async (res: publishableKey) => {
      const { publishableKey } = res;
      setStripePromise(await loadStripe(publishableKey));
    });
  }, []);
  return (
    <>
      <h1>React Stripe and Payment</h1>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
