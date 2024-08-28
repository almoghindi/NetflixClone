import HeaderLandingPage from "../../layouts/header-landing-page";
import Logout from "../logout";
import AmexLogo from "../../assets/img/payment-assets/amex.svg";
import MasterCardLogo from "../../assets/img/payment-assets/mastercard.svg";
import VisaLogo from "../../assets/img/payment-assets/visa.svg";

import PaypalLogo from "../../assets/img/payment-assets/paypal.svg";

interface ChoosePaymentProps {
   onPaymentMethodSelect: (method: string) => void;
}

const ChoosePayment: React.FC<ChoosePaymentProps> = ({ onPaymentMethodSelect: onPaymentMethodSelect }) => {
  const handlePaymentSelect = (method: string) => {
      onPaymentMethodSelect(method);
  };

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

      <div
        style={{ minHeight: "80vh" }}
        className="flex flex-col items-center justify-center  bg-white p-4"
      >
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 border-2 border-red-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">STEP 3 OF 3</p>
          <h1 className="text-3xl font-semibold mb-6">Choose your payment.</h1>
          <p className="text-lg text-center text-gray-700 mb-4">
            Your payment is encrypted and you can change how .
            <br />
            you pay anitime.
            <br />
          </p>
          <p>
            <strong>
              Secure for peace of mind.
              <br />
              Cancel easily online.
            </strong>
          </p>
          <br />
          <div className="space-y-4">
            <button
              onClick={() => handlePaymentSelect("Credit or Debit Card")}
              className={`flex items-center justify-between w-full py-3 px-6 border rounded hover:border-red-600 transition duration-300`}
            >
              <span>Credit or Debit Card</span>
              <div className="flex space-x-2">
                <img src={VisaLogo} alt="Visa" className="w-8" />
                <img src={MasterCardLogo} alt="MasterCard" className="w-8" />
                <img src={AmexLogo} alt="Amex" className="w-8" />
              </div>
            </button>
            <button
              onClick={() => handlePaymentSelect("PayPal")}
              className="flex items-center justify-between w-full py-3 px-6 border rounded hover:border-red-600 transition duration-300"
            >
              <span>PayPal</span>
              <img src={PaypalLogo} alt="PayPal" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePayment;
