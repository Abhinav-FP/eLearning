import React from "react";

const SuccessPage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Payment Successful! ✅</h1>
      <p className="text-lg text-gray-700 mt-2">Thank you for your payment.</p>
      <button 
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
