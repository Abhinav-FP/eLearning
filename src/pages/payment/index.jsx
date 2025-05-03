'use client';

import { PayPalScriptProvider, PayPalButtons ,FUNDING } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Listing from "../api/Listing";
import toast from "react-hot-toast";


const Index = ({isPopupOpen , PricePayment}) => {
  const router = useRouter();


  const [isProcessing, setIsProcessing] = useState(false);
  const [OrderId, setOrderId] = useState("")

  const handleCreateOrder = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const main = new Listing();
      const response = await main.PaypalCreate({
        amount: PricePayment,
        currency: "USD",
      });

      if (response?.data?.id) {
        const id = response.data.id;
        setOrderId(id);
        return id; // 🔥 Return it here!
      } else {
        throw new Error("No order ID returned from backend");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };


  const handleApprove = async (data, actions) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const main = new Listing();
      const response = await main.PaypalApprove({
        orderID: data.orderID, // or use OrderId if you prefer
      });

      if (response?.data?.status === "COMPLETED") {
        router.push("/success")
        console.log("Payment approved", response);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async (data, actions) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const main = new Listing();
      const response = await main.PaypalCancel({
        orderID: data.orderID,
      });

      if (response?.data?.status === "CANCELLED") {
        router.push("/cancel")
        console.log("Payment CANCELLED", response);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Acq8BOAgNmN-iAGdJDmqJj9t-5VN6pA5KCsqGqvxdkrLis0-CRIjDwqtsYZwNRZ4F5uYEQfkxm_zMOXk" }}>
        <div className="mt-6 w-full">
        <PayPalButtons
  createOrder={handleCreateOrder}
  onApprove={handleApprove}
  onCancel={handleCancel}
  disabled={isProcessing}
  fundingSource={FUNDING.PAYPAL}
  style={{
    layout: 'vertical',
    color: 'gold',     // try 'black' or 'blue' if needed
    shape: 'pill',
    label: 'pay',      // only shows 'PayPal' text
    height: 45         // optional
  }}
/>

        </div>
    </PayPalScriptProvider>
  );
};

export default Index;
