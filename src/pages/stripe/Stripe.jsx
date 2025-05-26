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

function StripeForm({ PricePayment, selectedLesson, adminCommission, selectedSlot, studentTimeZone, email }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [endTime, setEndTime] = useState(null);
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
    if (selectedLesson && selectedSlot) {
      const time = addDurationToDate(selectedSlot?.start, selectedLesson?.duration);
      setEndTime(time);
    }
  }, [selectedSlot, selectedLesson]);

  const handlePayment = async () => {
    if (processing || !stripe || !elements) return;

    try {
      localStorage.setItem("email", email);
      setProcessing(true);

      const payment = new Listing();
      const res = await payment.Stripe_payment({
        adminCommission,
        amount: PricePayment,
        currency: "USD",
        email,
        LessonId: selectedLesson?._id,
        teacherId: selectedLesson?.teacher?._id,
        startDateTime: selectedSlot?.start,
        endDateTime: endTime,
        timezone: studentTimeZone || "UTC",
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
      toast.error("Error during payment");
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
        {processing ? "Processing..." : `Pay $${PricePayment} USD`}
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
