import React from "react";

const PaymentCheckout = ({ selectedLesson, selectedSlot }) => {
  
  function getFormattedEndTime(time, durationInMinutes) {
    const start = new Date(time);
    const end = new Date(start.getTime() + durationInMinutes * 60000);

    const options = {
      month: "short", // e.g. "May"
      day: "numeric", // e.g. "2"
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return end.toLocaleString("en-US", options); // → "May 2, 7:40 PM"
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left: Payment Method */}
      <div className="border border-[#CC2828] h-fit rounded-xl p-4 w-full md:w-1/2">
        <h2 className="text-[#CC2828] font-semibold mb-4">Payment Method</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border rounded-lg p-3 hover:border-red-400">
            <div className="flex items-center gap-3">
              <span className="text-xl">🅿️</span>
              <p>PayPal</p>
            </div>
            <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
          </div>

          <div className="flex items-center justify-between border rounded-lg p-3 hover:border-red-400">
            <div className="flex items-center gap-3">
              <span className="text-xl">💳</span>
              <p>Credit Card - Stripe</p>
            </div>
            <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right: Summary */}
      <div className="border border-[#CC2828] rounded-xl p-4 w-full md:w-1/2 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/48"
            alt="Tutor"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold capitalize">
              {selectedLesson?.teacher?.name || ""}
            </p>
            <p className="text-sm text-gray-500  capitalize">
              {selectedLesson?.title || ""}
            </p>
            <p className="text-sm text-gray-500">
              {selectedLesson?.duration
                ? `${selectedLesson?.duration} mins`
                : ""}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {new Date(selectedSlot.start).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              -
              {getFormattedEndTime(
                selectedSlot?.start,
                selectedLesson?.duration
              )}{" "}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <p className="font-medium">Total</p>
            <p className="font-medium">$20.00 USD</p>
          </div>
          <p className="text-sm text-gray-500">+ Processing fee $82.40 USD</p>
          <p className="text-sm text-gray-500">Estimated $2,765.2 USD</p>
        </div>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-full">
          Pay $20 USD
        </button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
