import React from "react";

const CancelPage = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100">
            <h1 className="text-3xl font-bold text-red-700">Payment Failed ❌</h1>
            <p className="text-lg text-gray-700 mt-2">Something went wrong with your payment.</p>
            <button
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                Try Again
            </button>
        </div>
    );
};

export default CancelPage;
