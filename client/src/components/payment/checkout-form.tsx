import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { plans } from "../../utils/plans";

interface CheckoutForm {
  selectedPlan: string;
  setStep: (step: number) => void;
}
const CheckoutForm: React.FC<CheckoutForm> = ({ selectedPlan, setStep }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/`,
      },
      redirect: "if_required",
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message!);
      } else {
        setMessage("An unexpected error occured.");
      }
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status " + paymentIntent.status);
    }
    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-sm text-gray-500 text-center">STEP 3 OF 3</h3>
      <h2 className="text-2xl font-bold text-center mt-2 mb-6">
        Set up your credit or debit card
      </h2>

      <div className="mb-4">
        <PaymentElement
          id="payment-element"
          options={{ layout: "tabs", paymentMethodOrder: ["card"] }}
        />
      </div>

      <div className="text-center text-lg font-medium mb-6">
        {plans.find((p) => p.type === selectedPlan)?.price}
        /month
        <a onClick={() => setStep(4)} className="ml-2 text-blue-600">
          Change
        </a>
      </div>

      <div className="mb-6">
        <input type="checkbox" id="agree" className="mr-2" required />
        <label htmlFor="agree" className="text-sm text-gray-700">
          By checking the checkbox below, you agree to our{" "}
          <a href="/terms-of-use" className="text-blue-600">
            Terms of Use
          </a>
          , <a className="text-blue-600">Privacy Statement</a>, and that you are
          over 18. Netflix will automatically continue your membership and
          charge the membership fee to your payment method until you cancel. You
          may cancel at any time to avoid future charges.
        </label>
      </div>

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-3 bg-red-600 text-white text-lg font-bold rounded hover:bg-red-700"
      >
        <span>{isProcessing ? "Processing..." : "Start Membership"}</span>
      </button>

      {message && (
        <div className="text-center text-red-600 mt-4">{message}</div>
      )}
    </form>
  );
};
export default CheckoutForm;
