import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Listing from '../api/Listing';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function StripeForm({ PricePayment, selectedLesson, adminCommission, selectedSlot, studentTimeZone, email, 
                      isSpecialSlot=false, specialSlotData, processingFee, isBulk = false, multipleLessons = 1 }) {
  // console.log("processingFee",processingFee);
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [endTime, setEndTime] = useState(isSpecialSlot ? specialSlotData?.endDateTime : null);
  const [message, setMessage] = useState(null);
  const router = useRouter()
  const addDurationToDate = (start, durationInMinutes) => {
    const originalDate = new Date(start);
    const finalDate = new Date(originalDate.getTime() + durationInMinutes * 60000);

    const isStringInput = typeof start === 'string';
    if (!isStringInput) return finalDate;

    const localeString = originalDate.toLocaleString(undefined, {
      timeZoneName: 'short',
      hour12: false
    });

    const timezoneAbbreviation = localeString.split(' ').pop();

    const formatted = finalDate.toLocaleString(undefined, {
      timeZoneName: 'short',
      hour12: false
    });

    return formatted.replace(/GMT[^\s]+|[A-Z]{2,5}$/, timezoneAbbreviation);
  };

  useEffect(() => {
    if (selectedLesson && selectedSlot && !isSpecialSlot) {
      const time = addDurationToDate(selectedSlot?.start, selectedLesson?.duration);
      setEndTime(time);
    }
  }, [selectedSlot, selectedLesson]);

  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
  if (!elements) return; // <--- bail out if elements is not ready yet

  const cardElement = elements.getElement(CardElement);
  if (!cardElement) return;

  const handleChange = (event) => {
    setCardComplete(event.complete); // true when card details are valid
  };

  cardElement.on('change', handleChange);

  // cleanup listener on unmount
  return () => {
    cardElement.off('change', handleChange);
  };
}, [elements]); 

  const handlePayment = async () => {
    const trimmedEmail = email?.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!trimmedEmail || !emailPattern.test(trimmedEmail)){
      toast.error("Please enter a valid email address");
      return;
    }
    if (!cardComplete) {
      toast.error("Please enter valid card details");
      return; 
    }
    if (processing || !stripe || !elements) return;

    try {
      localStorage.setItem("email", email);
      setProcessing(true);

      const payment = new Listing();
      const res = await payment.Stripe_payment({
        adminCommission : adminCommission.toFixed(2),
        amount: PricePayment.toFixed(2),
        currency: "USD",
        email,
        LessonId: isSpecialSlot ? specialSlotData?.lesson?._id : selectedLesson?._id,
        teacherId: isSpecialSlot ? specialSlotData?.teacher?._id : selectedLesson?.teacher?._id,
        startDateTime: isSpecialSlot ? specialSlotData?.startDateTime : selectedSlot?.start,
        endDateTime:  isSpecialSlot ? specialSlotData?.endDateTime : endTime,
        timezone: studentTimeZone || "UTC",
        isSpecial: isSpecialSlot,
        processingFee: processingFee.toFixed(2),
        isBulk: isBulk,
        multipleLessons: multipleLessons
      });
      const clientSecret = res?.data?.clientSecret;
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setMessage(paymentResult.error.message);
        router.push("/cancel")

        toast.error(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        router.push("/success")
        setMessage('✅ Payment successful! Thank you.');
        toast.success("Payment successful!");
      }

    } catch (err) {
      console.error("Payment error:", err);
      const errorMessage = err?.response?.data?.error || err?.message || "Error during payment";
      toast.error(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4 space-y-4 border rounded-lg">
      <CardElement className="p-2 border rounded-md" />
      <button
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-full"
        onClick={handlePayment}
        disabled={processing || !stripe || !elements}
      >
        {processing ? "Processing..." : `Pay $${PricePayment && PricePayment.toFixed(2)} USD`}
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}

export default function StripeWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm {...props} />
    </Elements>
  );
}
