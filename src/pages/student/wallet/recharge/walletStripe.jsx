import React, { useState } from "react";
import toast from "react-hot-toast";
import Listing from "@/pages/api/Listing";
import { formatMultiPrice } from "@/components/ValueDataHook";

function StripeCheckoutRedirect({ PricePayment, email }) {
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    const trimmedEmail = email?.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (processing) return;

    try {
      setProcessing(true);

      const payment = new Listing();
      const res = await payment.walletStripeRecharge({
        amount: PricePayment.toFixed(2),
        currency: "USD",
        email,
      });

      const checkoutUrl = res?.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Stripe checkout URL not received");
      }

      // 🔁 Redirect to Stripe
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(
        err?.response?.data?.error || err?.message || "Payment failed",
      );
      setProcessing(false);
    }
  };

  return (
    <div className="">
      <button
        className="w-full bg-[#55844D] hover:bg-[#3d5e37] text-white font-medium py-2 rounded-full"
        onClick={handlePayment}
        disabled={processing}
      >
        {processing
          ? "Redirecting to Stripe..."
          : `Pay ${formatMultiPrice(PricePayment || 0, "USD") || ""}`}
      </button>
    </div>
  );
}

export default StripeCheckoutRedirect;