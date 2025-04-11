'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PayPalButton = () => {
  const router = useRouter();

  function calculateTotal({ items }) {
    console.log("items:", items);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total;
  }

  // Example usage
  const cartData = {
    items: [
      { name: 'Product 1', price: 2, quantity: 1 },
      { name: 'Product 2', price: 2, quantity: 1 },
      { name: 'Product 3', price: 2, quantity: 1 }
    ]
  };

  const totalAmount = calculateTotal(cartData);
  console.log("Total Amount:", totalAmount); // ➜
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateOrder = async () => {
    const response = await fetch("http://localhost:5000/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartData }),
    });

    const data = await response.json();
    return data.id;
  };

  const handleApprove = async (data) => {
    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:5000/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const details = await response.json();
      if (response.ok && details?.data?.status === "COMPLETED") {
        router.push("/success");
      } else {
        alert("Something went wrong.");
        router.push("/cancel");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async (data) => {
    const response = await fetch("http://localhost:5000/api/payment/cancel-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID: data.orderID }),
    });

    const result = await response.json();
    if (result.status === "CANCELLED") {
      alert("Payment was cancelled!");
      router.push("/cancel");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Acq8BOAgNmN-iAGdJDmqJj9t-5VN6pA5KCsqGqvxdkrLis0-CRIjDwqtsYZwNRZ4F5uYEQfkxm_zMOXk" }}>
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛒 Your Cart</h2>

        {/* <div className="w-full bg-white shadow-md rounded-lg p-4">
          {cartData.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <span className="text-gray-700 font-medium">
                {item.name} <span className="text-sm text-gray-500">x{item.quantity}</span>
              </span>
              <span className="text-gray-800 font-semibold">${item.price * item.quantity}</span>
            </div>
          ))}
        </div> */}

        <div className="w-full flex justify-between items-center text-lg font-bold mt-4 px-4 py-2 bg-gray-200 rounded-lg">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
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

export default PayPalButton;
