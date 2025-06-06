import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import { useRouter } from "next/router";
import Listing from "../api/Listing";
import Stripe from "../stripe/Stripe";
import Payment from "../payment/index";
import { formatMultiPrice } from "@/components/ValueDataHook";
import Image from "next/image";
import Heading from "../common/Heading";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);
  const [PaymentStatus, setPaymentStatus] = useState(false);
  const [studentTimeZone, setStudentTimeZone] = useState(null);
  console.log("slug", slug);

  const fetchData = async (slug) => {
    try {
      const main = new Listing();
      const response = await main.SpecialSlotdata(slug);
      if (response.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
      setData(null);
    }
  };

  // Get timezone
  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    setStudentTimeZone(timeZone);
  }, []);

  const [email, setEmail] = useState(data?.student?.email || "");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  function getDurationInMinutes(startDateTime, endDateTime) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    const durationMs = end - start;
    const durationMinutes = Math.floor(durationMs / (1000 * 60)); // convert ms to minutes

    return durationMinutes;
  }

  useEffect(() => {
    if (slug) {
      fetchData(slug);
    }
  }, [slug]);
  console.log("data", data);

  return (
    <Layout>
      <div className="h-[50vh] mt-28">
        <Heading
          classess="text-[#CC2828] !text-3xl !mb-0 text-center"
          title={data?.lesson?.title}
        />
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left: Payment Method */}
          <div className="border border-[#CC2828] h-fit rounded-xl p-4 w-full md:w-1/2">
            <h2 className="text-[#CC2828] font-semibold mb-4">
              Payment Method
            </h2>
            <div className="space-y-4">
              <div
                onClick={() => setPaymentStatus(false)}
                className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${
                  PaymentStatus === true ? "border-red-300" : "border-red-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🅿️</span>
                  <p>PayPal</p>
                </div>
                {PaymentStatus === false ? (
                  <span className="w-4 h-4 border-2 border-green-500 bg-green-500 rounded-full" />
                ) : (
                  <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
                )}
              </div>

              <div
                onClick={() => setPaymentStatus(true)}
                className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${
                  PaymentStatus === true ? "border-red-400" : "border-red-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💳</span>
                  <p>Credit Card - Stripe</p>
                </div>
                {PaymentStatus === true ? (
                  <span className="w-4 h-4 border-2 border-green-500 bg-green-500 rounded-full" />
                ) : (
                  <span className="w-4 h-4 border-2 border-gray-400 rounded-full" />
                )}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="border border-[#CC2828] rounded-xl p-4 w-full md:w-1/2 space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src={data?.teacher?.profile_photo || "/profile.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
                height={44}
                width={44}
              />
              <div>
                <p className="font-semibold capitalize">
                  {data?.teacher?.name || ""}
                </p>
                {/* <p className="text-sm text-gray-500  capitalize">
              {selectedLesson?.title || ""}
            </p> */}
                <p className="text-sm text-gray-500">
              {getDurationInMinutes(data?.startDateTime, data?.endDateTime)} mins
            </p>
              <p className="text-sm text-gray-500 capitalize">
                {new Date(data?.startDateTime).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}{" "} 
                - {" "}
                {new Date(data?.endDateTime).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              </div>
            </div>

            {/* Email Input field */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CC2828] focus:border-[#CC2828]"
                placeholder="Enter your email"
              />
            </div>

            <div className="border-t border-[#CC2828] pt-4">
              <div className="flex justify-between">
                <p className="font-medium">Total</p>
                {/* <p className="font-medium">${selectedLesson?.price} USD</p> */}
                <p className="font-medium">
                  {formatMultiPrice(data?.amount + 0.1 * data?.amount, "USD")}
                </p>
              </div>
              <p className="text-sm text-gray-500">{`Included processing fee of ${formatMultiPrice(
                0.1 * data?.amount,
                "USD"
              )}`}</p>
              {/* <p className="text-sm text-gray-500">Estimated ${(selectedLesson?.price + 0.1*selectedLesson?.price).toFixed(2)} USD</p> */}
            </div>

            {PaymentStatus === false ? (
          <Payment PricePayment={data?.amount + 0.1 * data?.amount} adminCommission={0.1 * data?.amount} selectedLesson={data?.lesson}  selectedSlot={data?.startDateTime} studentTimeZone={studentTimeZone} email={email} isSpecialSlot={true} specialSlotData={data}/>
        ) : (
          <Stripe PricePayment={data?.amount + 0.1 * data?.amount} adminCommission={0.1 * data?.amount} selectedLesson={data?.lesson}  selectedSlot= {data?.startDateTime} studentTimeZone={studentTimeZone} email={email} isSpecialSlot={true} specialSlotData={data}/>
        )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
