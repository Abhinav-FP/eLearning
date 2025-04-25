'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Listing from "../api/Listing";
import toast from "react-hot-toast";

const Index = () => {
  const router = useRouter();


  const [isProcessing, setIsProcessing] = useState(false);
  const [OrderId, setOrderId] = useState("")

  const handleCreateOrder = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const main = new Listing();
      const response = await main.PaypalCreate({
        amount: 100,
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
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">    Trial Lessons</h2>
        <div className="w-full flex justify-between items-center text-lg font-bold mt-4 px-4 py-2 bg-gray-200 rounded-lg">
          <span>Total:</span>
          <span>${100}</span>
        </div>

        <div className="mt-6 w-full">
          <PayPalButtons
            createOrder={handleCreateOrder}
            onApprove={handleApprove}
            onCancel={handleCancel}
            style={{ layout: 'vertical' }}
            disabled={isProcessing}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Index;
