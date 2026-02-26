import Listing from "@/pages/api/Listing";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function walletPaypal({ PricePayment, email }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  // console.log("IsBonus" ,IsBonus)
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [OrderId, setOrderId] = useState("");

  const handleCreateOrder = async () => {
    const trimmedEmail = email?.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!trimmedEmail || !emailPattern.test(trimmedEmail)){
      toast.error("Please enter a valid email address");
      return;
    }
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const main = new Listing();
      const response = await main.PaypalCreate({
        amount: PricePayment.toFixed(2),
        currency: "USD",
      });

      if (response?.data?.id) {
        const id = response.data.id;
        setOrderId(id);
        return id; // 🔥 Return it here!
      } else {
        throw new Error("No order ID returned from backend");
      }
    } catch (err) {
      console.error("API error:", err);
      const errorMessage = err?.response?.data?.error || err?.message || "Error during payment";
      toast.error(errorMessage);
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
      const response = await main.walletPaypalRecharge({
        orderID: data.orderID, // or use OrderId if you prefer
        email: email,
        totalAmount: PricePayment.toFixed(2),
      });

      if (response?.data?.success) {
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

    // console.log("LessonId:", isSpecialSlot ? specialSlotData?.lesson?._id : selectedLesson?._id);
    // console.log("teacherId:", isSpecialSlot ? specialSlotData?.teacher?._id : selectedLesson?.teacher?._id);
    // console.log("startDateTime:", isSpecialSlot ? specialSlotData?.startDateTime : selectedSlot?.start);
    // console.log("endDateTime:", isSpecialSlot ? specialSlotData?.endDateTime : endTime);
    // console.log("email:", email);
    // console.log("timezone:", studentTimeZone || "UTC");
    // console.log("totalAmount:", PricePayment.toFixed(2));
    // console.log("adminCommission:", adminCommission.toFixed(2));
    // console.log("isSpecialSlot:", isSpecialSlot);
    // console.log("IsBonus:", IsBonus);
    // console.log("processingFee:", processingFee.toFixed(2));
    // console.log("isBulk:", isBulk);
    // console.log("multipleLessons:", multipleLessons);

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
};