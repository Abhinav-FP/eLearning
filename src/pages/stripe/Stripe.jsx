import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Listing from '../api/Listing';
import { FaYenSign } from 'react-icons/fa';

export default function Stripe() {
    const [processing, setprocessing] = useState(false);

    const handlePayment = async () => {
        try {
          setprocessing(true);
          const payment = new Listing();
          const resp = payment.Stripe_payment({
            amount:100,
            currency: "JPY",
          });
          resp
            .then((res) => {
              if (res.data.url) {
                window.location.href = res.data.url;
              }
              setprocessing(false);
            })
            .catch((err) => {
              console.log("err", err);
              toast.error(err?.response?.data?.error);
              setprocessing(false);
            });
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error during payment");
          setprocessing(false);
        }
      };
  return (
<>
<div className="flex flex-col items-center">
    <div className="w-full flex justify-between items-center text-lg font-bold mt-4 px-4 py-2 bg-gray-200 rounded-lg">
      <span>Total:</span>
      <span>
      ¥ {10000}</span>
    </div>
    <button
    onClick={() => {
        handlePayment();
    }}
    className="font-medium cursor-pointer rounded-full mt-5 py-2 px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-base w-full py-3.5"
  >
    {processing ? "Processing.." : "Stripe Payment"}
  </button>
  </div>
</>
  )
}
