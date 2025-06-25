import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import Listing from '@/pages/api/Listing';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function StripeForm({
    PricePayment,
    bookingdata,
    isbouns }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const router = useRouter()


    const handlePayment = async () => {
        if (processing || !stripe || !elements) return;

        try {
            setProcessing(true);
            const payment = new Listing();
            const res = await payment.Stripe_payment({
                amount: PricePayment,
                currency: "USD",
                LessonId: bookingdata?.LessonId,
                teacherId: bookingdata?.teacherId,
                BookingId: bookingdata?._id,
                isbouns: isbouns
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
                router.push("/student/review/cancel");

                toast.error(paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                router.push("/student/review/success");
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

export default function StripeTips(props) {
    return (
        <Elements stripe={stripePromise}>
            <StripeForm {...props} />
        </Elements>
    );
}
