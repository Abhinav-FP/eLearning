import { useState } from "react";
import Heading from "../../../common/Heading";
import Payment from "./walletPaypal";
import Stripe from "./walletStripe";
import { formatMultiPrice } from "@/components/ValueDataHook";
import StudentLayout from "../../Common/StudentLayout";

export default function Index() {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(300); // minimum default

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
   <StudentLayout page={"Recharge Wallet"}>
      {/* <Heading
        classess="text-[#55844D] !text-3xl !mb-0 text-center"
        title={"Recharge Wallet"}
      /> */}

      <div className="flex flex-col md:flex-row gap-6 p-6">

        {/* LEFT - PAYMENT METHOD */}
        <div className="border border-[#55844D] h-fit rounded-xl p-4 w-full md:w-1/2">
          <h2 className="text-[#55844D] font-semibold mb-4">
            Payment Method
          </h2>

          <div className="space-y-4">

            {/* PayPal */}
            <div
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${
                paymentMethod === "paypal"
                  ? "border-green-400"
                  : "border-green-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🅿️</span>
                <p>PayPal</p>
              </div>

              {paymentMethod === "paypal" ? (
                <span className="w-4 h-4 border-2 border-green-500 bg-green-500 rounded-full" />
              ) : (
                <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
              )}
            </div>

            {/* Stripe */}
            <div
              onClick={() => setPaymentMethod("stripe")}
              className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${
                paymentMethod === "stripe"
                  ? "border-green-400"
                  : "border-green-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💳</span>
                <p>Credit Card - Stripe</p>
              </div>

              {paymentMethod === "stripe" ? (
                <span className="w-4 h-4 border-2 border-green-500 bg-green-500 rounded-full" />
              ) : (
                <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="border border-[#55844D] rounded-xl p-6 w-full md:w-1/2 space-y-6">

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Recharge Amount (Minimum $300)
            </label>
            <input
              type="number"
              min={300}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#55844D] focus:border-[#55844D]"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address for Payment
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#55844D] focus:border-[#55844D]"
              placeholder="Enter your email"
            />
          </div>

          {/* Summary */}
          <div className="border-t border-[#55844D] pt-4 space-y-2">
            <div className="flex justify-between">
              <p className="font-medium">Recharge Amount</p>
              <p className="font-medium">{formatMultiPrice(amount, "USD")}</p>
            </div>

            <div className="flex justify-between text-lg font-semibold text-[#55844D] pt-2">
              <p>Total</p>
              <p>{formatMultiPrice(amount, "USD")}</p>
            </div>
          </div>

          {/* PAYMENT COMPONENT */}
          {paymentMethod === "paypal" ? (
            <Payment
              PricePayment={amount}
              email={email}
            />
          ) : (
            <Stripe
              PricePayment={amount}
              email={email}
            />
          )}
        </div>
      </div>
    </StudentLayout>
  );
}