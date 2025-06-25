"use client";

import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Listing from "../api/Listing";
import toast from "react-hot-toast";

function Index({
  PricePayment,
  adminCommission,
  selectedLesson,
  selectedSlot,
  studentTimeZone,
  email,
  isSpecialSlot = false,
  specialSlotData,
  IsBonus,
}) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  console.log("IsBonus" ,IsBonus)
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [OrderId, setOrderId] = useState("");
  const [endTime, setEndTime] = useState(
    isSpecialSlot ? specialSlotData?.endDateTime : null
  );

  const addDurationToDate = (start, durationInMinutes) => {
    const originalDate = new Date(start);
    const finalDate = new Date(
      originalDate.getTime() + durationInMinutes * 60000
    );

    // Detect if input was a string with timezone (for matching formatting)
    const isStringInput = typeof start === "string";

    // If it was a Date object, return Date object
    if (!isStringInput) return finalDate;

    // Match the original locale and timezone style using toLocaleString
    const localeString = originalDate.toLocaleString(undefined, {
      timeZoneName: "short",
      hour12: false,
    });

    const timezoneAbbreviation = localeString.split(" ").pop();

    const formatted = finalDate.toLocaleString(undefined, {
      timeZoneName: "short",
      hour12: false,
    });

    // Replace new abbreviation with old one (preserves input tz style)
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

  const handleCreateOrder = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const main = new Listing();
      const response = await main.PaypalCreate({
        amount: PricePayment,
        currency: "USD",
      });

      if (response?.data?.id) {
        const id = response.data.id;
        setOrderId(id);
        return id; // 🔥 Return it here!
      } else {
        throw new Error("No order ID returned from backend");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = async (data, actions) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      localStorage && localStorage.setItem("email", email);
      const main = new Listing();
      const response = await main.PaypalApprove({
        orderID: data.orderID, // or use OrderId if you prefer
        LessonId: isSpecialSlot
          ? specialSlotData?.lesson?._id
          : selectedLesson?._id,
        teacherId: isSpecialSlot
          ? specialSlotData?.teacher?._id
          : selectedLesson?.teacher?._id,
        startDateTime: selectedSlot?.start,
        endDateTime: isSpecialSlot ? specialSlotData?.startDateTime : endTime,
        email: email,
        timezone: studentTimeZone || "UTC",
        totalAmount: PricePayment,
        adminCommission: adminCommission,
        isSpecialSlot: isSpecialSlot,
        IsBonus : IsBonus

      });

      if (response?.data?.status === "COMPLETED") {
        router.push("/success");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async (data, actions) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const main = new Listing();
      const response = await main.PaypalCancel({
        orderID: data.orderID,
        LessonId: isSpecialSlot
          ? specialSlotData?.lesson?._id
          : selectedLesson?._id,
      });
      if (response?.data?.status === "CANCELLED") {
        router.push("/cancel");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <div className="w-full">
        <PayPalButtons
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onCancel={handleCancel}
          disabled={isProcessing}
          style={{ layout: "vertical" }}
          fundingSource={FUNDING.PAYPAL}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default Index;
