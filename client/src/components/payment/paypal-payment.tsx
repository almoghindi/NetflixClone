import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import HeaderLandingPage from "../../layouts/header-landing-page";
import Logout from "../logout";
import PayPalLogo from "../../assets/img/payment-assets/paypal.svg";
import { sendRequest } from '../../hooks/use-request';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, signupSuccess } from '../../store/slices/authSlice';
import { encryptObject } from '../../utils/encription';

interface PaymentProps {
    selectedPlan: string;
    PlanPrice: string;
    setStep: (step: number) => void;
}

const PayPalSetup: React.FC<PaymentProps> = ({ selectedPlan, PlanPrice }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector((state: RootState) => state.auth);

    const [isLoading, setIsLoading] = useState(true);
    const navigaion = useNavigate();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const createOrder = async () => {
        try {
            const order = await sendRequest({
                port: 3004,
                url: '/api/payment/create-paypal-order',
                method: 'POST',
                body: {
                    selectedPlan,
                    PlanPrice,
                    userId: user?.userId,
                },
            });
            return order.id;
        } catch (error) {
            console.error("Failed to create order:", error);
        }
    };
    
    const onApprove = async (data: any) => {
        try {
            const orderData = await sendRequest({
                port: 3004,
                url: '/api/payment/capture-paypal-order',
                method: 'POST',
                body: {
                    orderID: data.orderID,
                    selectedPlan,
                    PlanPrice,
                },
            });
            console.log("Capture result", orderData);
            console.log("orderData", orderData.status);
            if (orderData.status === "COMPLETED") {
                if (!user || !user.subscription) {
                    return;
                }

                dispatch(setUser({ ...user, subscription: selectedPlan }));
                const encryptedResponse: string | null = encryptObject({...user, subscription: selectedPlan});
                localStorage.setItem("user", encryptedResponse as string);

                navigaion('/purchase-success', { state: { selectedPlan, PlanPrice } });
            }
        } catch (error) {
            console.error("Failed to capture order:", error);
        }
    };

    if (isLoading) {
        return <div>Loading PayPal...</div>;
    }

    return (
        <PayPalScriptProvider options={{ clientId: "ARX7Mke2yiT0PYgfuV2-360h2bgp3vrzYStlyL15sXy0fVH7GVwA_NDJ9-6kDoodzlVRS11-J7o72jFB", currency: "ILS" }}>
            <header className="bg-white border-b border-gray-200 py-0">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <HeaderLandingPage />
                    <div className="text-gray-600 font-bold text-md">
                        <Logout />
                    </div>
                </div>
            </header>
            <div className="flex flex-col items-center min-h-screen bg-white">
                <main className="flex flex-col mt-8 flex-grow w-full max-w-md px-4">
                    <h1 className="text-3xl font-semibold mb-6">Set up your PayPal</h1>
                    <div className="w-full bg-gray-100 rounded-md p-4 mb-6">
                        <p className="text-lg font-semibold">₪{PlanPrice}/month</p>
                        <p className="text-gray-600">{selectedPlan}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                        To finish signup, click the PayPal button below and complete the payment process.
                    </p>
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </main>
                <footer className="w-full p-4 text-center text-gray-500 text-sm">
                    <img src={PayPalLogo} alt="PayPal" className="h-6 mx-auto mb-2" />
                    <p>PayPal is a trusted partner of Netflix.</p>
                </footer>
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalSetup;