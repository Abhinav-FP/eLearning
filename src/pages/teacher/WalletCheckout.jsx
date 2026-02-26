import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Listing from '../api/Listing';
import { useRouter } from 'next/router';

export default function WalletCheckout({
  PricePayment,
  selectedLesson,
  adminCommission,
  selectedSlot,
  studentTimeZone,
  email,
  isSpecialSlot = false,
  specialSlotData,
  processingFee,
  isBulk = false,
  multipleLessons = 1
}) {
  const [processing, setProcessing] = useState(false);
  const [endTime, setEndTime] = useState(
    isSpecialSlot ? specialSlotData?.endDateTime : null
  );
  const [message, setMessage] = useState(null);
  const router = useRouter();

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
      const time = addDurationToDate(
        selectedSlot?.start,
        selectedLesson?.duration
      );
      setEndTime(time);
    }
  }, [selectedSlot, selectedLesson]);


  const handlePayment = async () => {
    const trimmedEmail = email?.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (processing) return;

    try {
      localStorage.setItem("email", email);
      setProcessing(true);

      const payment = new Listing();

      // 🆕 WALLET PAYMENT API
      const res = await payment.Wallet_payment({
        adminCommission: adminCommission.toFixed(2),
        totalAmount: PricePayment.toFixed(2),
        currency: "USD",
        email,
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
          : endTime,
        timezone: studentTimeZone || "UTC",
        isSpecial: isSpecialSlot,
        processingFee: processingFee.toFixed(2),
        isBulk,
        multipleLessons
      });

      if (res?.data?.status) {
        router.push("/success");
        setMessage("✅ Payment successful! Thank you.");
        toast.success("Payment successful!");
      } else {
        throw new Error(res?.data?.message || "Wallet payment failed");
      }

    } catch (err) {
      console.error("Wallet payment error:", err);
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Error during payment";

      toast.error(errorMessage);
    //   router.push("/cancel");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4 space-y-4 border rounded-lg">
      <button
        className="w-full bg-[#55844D] hover:bg-[#3d5e37] text-white font-medium py-2 rounded-full disabled:opacity-60"
        onClick={handlePayment}
        disabled={processing}
      >
        {processing
          ? "Processing..."
          : `Pay via Wallet $${PricePayment?.toFixed(2)} USD`}
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
};