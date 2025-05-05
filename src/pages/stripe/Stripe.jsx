import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Listing from '../api/Listing';

export default function Stripe({PricePayment ,selectedLesson , selectedSlot, studentTimeZone}) {
  console.log("selectedSlot" ,selectedSlot)
  const [processing, setprocessing] = useState(false);

 
  const handlePayment = async () => {
    if(processing){return;}
    try {
      setprocessing(true);
      const payment = new Listing();
      const resp = payment.Stripe_payment({
        amount: PricePayment,
        currency: "USD",
        LessonId : selectedLesson?._id,
        teacherId :  selectedLesson?.teacher?._id,
        startDateTime : selectedSlot?.start ,
        endDateTime : selectedSlot?.end,
        timezone : studentTimeZone || "UTC",
      });
      resp.then((res) => {
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
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-full" 
         onClick={() => {
          handlePayment();
        }}
        >
         {processing ? "Processing..." : `Pay ${PricePayment} USD`}
        </button> 
    </>
  )
}
