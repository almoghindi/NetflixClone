import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { sendRequest } from "../../hooks/use-request";

interface Customer {
  email: string;
  name: string;
}

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    setCustomer(JSON.parse(localStorage.getItem("customer")!) as Customer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements!.getElement(PaymentElement)!,
    });
    const response = await sendRequest({
      url: "/api/payment/create-subscription",
      method: "POST",
      body: {
        priceId: "",
        customer: customer,
        paymentMethod: paymentMethod?.paymentMethod?.id,
      },
    });
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
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
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Subscribe"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
