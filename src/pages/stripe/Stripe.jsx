import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Listing from '../api/Listing';

export default function Stripe({PricePayment, selectedLesson, adminCommission, selectedSlot, studentTimeZone}) {
  const [processing, setprocessing] = useState(false);
  const[endTime,setEndTime] = useState(null);

  const addDurationToDate = (start, durationInMinutes) => {
    const originalDate = new Date(start);
    const finalDate = new Date(originalDate.getTime() + durationInMinutes * 60000);
  
    // Detect if input was a string with timezone (for matching formatting)
    const isStringInput = typeof start === 'string';
  
    // If it was a Date object, return Date object
    if (!isStringInput) return finalDate;
  
    // Match the original locale and timezone style using toLocaleString
    const localeString = originalDate.toLocaleString(undefined, {
      timeZoneName: 'short',
      hour12: false
    });
  
    const timezoneAbbreviation = localeString.split(' ').pop();
  
    const formatted = finalDate.toLocaleString(undefined, {
      timeZoneName: 'short',
      hour12: false
    });
  
    // Replace new abbreviation with old one (preserves input tz style)
    return formatted.replace(/GMT[^\s]+|[A-Z]{2,5}$/, timezoneAbbreviation);
  };

  useEffect(()=>{
    if(selectedLesson && selectedSlot){
      const time = addDurationToDate(selectedSlot?.start, selectedLesson?.duration);
      setEndTime(time);
    }
  },[selectedSlot, selectedLesson])

 
  const handlePayment = async () => {
    if(processing){return;}
    try {
      setprocessing(true);
      const payment = new Listing();
      const resp = payment.Stripe_payment({
        adminCommission: adminCommission,
        amount: PricePayment,
        currency: "USD",
        LessonId : selectedLesson?._id,
        teacherId :  selectedLesson?.teacher?._id,
        startDateTime : selectedSlot?.start ,
        endDateTime : endTime,
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
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-full cursor-pointer" 
         onClick={() => {
          handlePayment();
        }}
        >
         {processing ? "Processing..." : `Pay ${PricePayment} USD`}
        </button> 
    </>
  )
}
