import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

import { useState } from "react";

const PayPalButton = () => {
  // 🛒 Sample Cart Items
  const router = useRouter(); // Next.js me routing ke liye

  const [cart, setCart] = useState([
    { name: "Product 1", price: 20, quantity: 2 },
    { name: "Product 2", price: 15, quantity: 1 },
    { name: "Product 3", price: 10, quantity: 3 },
  ]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCreateOrder = async () => {
    const response = await fetch("http://localhost:5000/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await response.json();
    return data.id;
  };

  const handleApprove = async (data) => {
    const response = await fetch("http://localhost:5000/payment/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID: data.orderID }),
    });
    const details = await response.json();
    console.log("details", details)
    if (response.ok && details.data.data.status === "COMPLETED") {
      router.push("/success"); // Success page pe redirect
    } else {
      router.push("/cancel"); // Cancel page pe redirect
    }
  };

  // const handleCancel = async (data) => {
  //   console.log("User cancelled the payment.");

  //   const response = await fetch("http://localhost:5000/payment/cancel-order", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ orderID: data.orderID }),
  //   });

  //   const result = await response.json();
  //   console.log("Cancel Response:", result);

  //   if (result.status === "CANCELLED") {
  //     alert("Payment was cancelled!");
  //     router.push("/cancel");
  //   } else {
  //     alert("Something went wrong!");
  //   }
  // };




  return (
    <PayPalScriptProvider options={{ "client-id": "Acq8BOAgNmN-iAGdJDmqJj9t-5VN6pA5KCsqGqvxdkrLis0-CRIjDwqtsYZwNRZ4F5uYEQfkxm_zMOXk" }}>
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛒 Your Cart</h2>
        <div className="w-full bg-white shadow-md rounded-lg p-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <span className="text-gray-700 font-medium">
                {item.name} <span className="text-sm text-gray-500">x{item.quantity}</span>
              </span>
              <span className="text-gray-800 font-semibold">${item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between items-center text-lg font-bold mt-4 px-4 py-2 bg-gray-200 rounded-lg">
          <span>Total:</span>
          <span>${totalAmount}</span>
        </div>

        <div className="mt-6 w-full">

          <PayPalButtons
            createOrder={handleCreateOrder}
            onApprove={handleApprove}
            // onCancel={handleCancel} // ✅ Cancel option added
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
