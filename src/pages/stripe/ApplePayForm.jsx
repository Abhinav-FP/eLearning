import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Listing from '../api/Listing';
import { useRouter } from 'next/router';
import { useStripe } from '@stripe/react-stripe-js';
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import StripeWrapper from './Stripe';

function ApplePay(props) {
  const stripe = useStripe(); // ✅ NOW SAFE
  const router = useRouter();

  const {
    PricePayment,
    selectedLesson,
    adminCommission,
    selectedSlot,
    studentTimeZone,
    email,
    isSpecialSlot,
    specialSlotData,
    processingFee,
    isBulk,
    multipleLessons
  } = props;

  const [paymentRequest, setPaymentRequest] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!stripe || !PricePayment) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Lesson Payment',
        amount: Math.round(PricePayment * 100),
      },
      requestPayerEmail: true,
    });

    pr.canMakePayment().then(result => {
      if (result?.applePay) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (ev) => {
      try {
        setProcessing(true);

        const payment = new Listing();
        const res = await payment.Stripe_payment({
          adminCommission: adminCommission.toFixed(2),
          amount: PricePayment.toFixed(2),
          currency: 'USD',
          email: ev.payerEmail || email,
          LessonId: isSpecialSlot
            ? specialSlotData?.lesson?._id
            : selectedLesson?._id,
          teacherId: isSpecialSlot
            ? specialSlotData?.teacher?._id
            : selectedLesson?.teacher?._id,
          startDateTime: isSpecialSlot
            ? specialSlotData?.startDateTime
            : selectedSlot?.start,
          endDateTime: isSpecialSlot
            ? specialSlotData?.endDateTime
            : null,
          timezone: studentTimeZone || 'UTC',
          isSpecial: isSpecialSlot,
          processingFee: processingFee.toFixed(2),
          isBulk,
          multipleLessons,
        });

        const clientSecret = res?.data?.clientSecret;

        const { error, paymentIntent } =
          await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          );

        if (error) {
          ev.complete('fail');
          toast.error(error.message);
          router.push('/cancel');
          return;
        }

        ev.complete('success');

        if (paymentIntent.status === 'requires_action') {
          await stripe.confirmCardPayment(clientSecret);
        }

        toast.success('Payment successful!');
        router.push('/success');

      } catch (err) {
        console.error(err);
        toast.error('Apple Pay failed');
        router.push('/cancel');
      } finally {
        setProcessing(false);
      }
    });
  }, [stripe, PricePayment]);

  if (!paymentRequest) return null;

  return (
    <div className="p-4 border rounded-lg">
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: {
              type: 'applePay',
              theme: 'dark',
              height: '44px',
            },
          },
        }}
      />
      {processing && (
        <p className="text-sm text-gray-600 mt-2">Processing…</p>
      )}
    </div>
  );
}

export default function ApplePayForm(props){
  return (    
  <StripeWrapper>
      <ApplePay {...props} />
    </StripeWrapper>
  )
};