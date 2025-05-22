import React, { useState } from "react";
import Stripe from "../stripe/Stripe";
import Payment from "../payment/index"
import Image from "next/image";

const PaymentCheckout = ({ selectedLesson, selectedSlot, studentTimeZone, user }) => {
  const [email, setEmail] = useState(user?.email || "");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // console.log("user", user);
  const [PaymentStatus, setPaymentStatus] = useState(false)
  // console.log("PaymentStatus", PaymentStatus)
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
          <div
            onClick={() => setPaymentStatus(false)}
            className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${PaymentStatus === true ? 'border-red-300' : 'border-red-400'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🅿️</span>
              <p>PayPal</p>
            </div>
            {PaymentStatus === false ? (
              <span className="w-4 h-4 border-2 border-green-500 bg-green-500 rounded-full" />
            ) : (
              <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
            )}
          </div>

          <div
            onClick={() => setPaymentStatus(true)}
            className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${PaymentStatus  === true ? 'border-red-400' : 'border-red-300'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">💳</span>
              <p>Credit Card - Stripe</p>
            </div>
            {PaymentStatus === true ? (
              <span className="w-4 h-4 border-2 border-green-500 bg-green-500 rounded-full" />
            ) : (
              <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
            )}


          </div>
        </div>
      </div>

      {/* Right: Summary */}
      <div className="border border-[#CC2828] rounded-xl p-4 w-full md:w-1/2 space-y-4">
        <div className="flex items-center gap-4">
          {/* <img
            src="https://via.placeholder.com/48"
            alt="Tutor"
            className="w-12 h-12 rounded-full object-cover"
          /> */}
          <Image
            src="/profile.png"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
            height={44}
            width={44}
          />
          <div>
            <p className="font-semibold capitalize">
              {selectedLesson?.teacher?.name || ""}
            </p>
            {/* <p className="text-sm text-gray-500  capitalize">
              {selectedLesson?.title || ""}
            </p> */}
            <p className="text-sm text-gray-500">
              {selectedLesson?.duration
                ? `${selectedLesson?.duration} mins`
                : ""}
            </p>
            {selectedSlot?.start && selectedLesson?.duration && (
              <p className="text-sm text-gray-500 capitalize">
                {new Date(selectedSlot?.start).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
                - {getFormattedEndTime(selectedSlot?.start, selectedLesson?.duration)}
              </p>
            )}
          </div>
        </div>

        {/* Email Input field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address for Payment
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CC2828] focus:border-[#CC2828]"
            placeholder="Enter your email"
          />
        </div>

        <div className="border-t border-[#CC2828] pt-4">
          <div className="flex justify-between">
            <p className="font-medium">Total</p>
            {/* <p className="font-medium">${selectedLesson?.price} USD</p> */}
            <p className="font-medium">
              ${(selectedLesson?.price + 0.1*selectedLesson?.price).toFixed(2)} USD
            </p>
          </div>
          <p className="text-sm text-gray-500">{`Included processing fee of $${(0.1*selectedLesson?.price).toFixed(2)} USD`}</p>
          {/* <p className="text-sm text-gray-500">Estimated ${(selectedLesson?.price + 0.1*selectedLesson?.price).toFixed(2)} USD</p> */}
        </div>

        {PaymentStatus === false ? (
          <Payment PricePayment={selectedLesson?.price + 0.1*selectedLesson?.price} adminCommission={0.1*selectedLesson?.price} selectedLesson={selectedLesson}  selectedSlot={selectedSlot} studentTimeZone={studentTimeZone} email={email}/>
        ) : (
          <Stripe PricePayment={selectedLesson?.price + 0.1*selectedLesson?.price} adminCommission={0.1*selectedLesson?.price} selectedLesson={selectedLesson}  selectedSlot= {selectedSlot} studentTimeZone={studentTimeZone} email={email}/>
        )}
      </div>
    </div>
  );
};

export default PaymentCheckout;
