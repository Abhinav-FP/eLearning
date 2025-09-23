import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import { useRouter } from "next/router";
import Listing from "../api/Listing";
import Stripe from "../stripe/Stripe";
import Payment from "../payment/index";
import { formatMultiPrice } from "@/components/ValueDataHook";
import { MdErrorOutline } from "react-icons/md";
import Image from "next/image";
import Heading from "../common/Heading";
import { SpecialSlotLoader } from "@/components/Loader";
import { useRole } from "@/context/RoleContext";
import toast from "react-hot-toast";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const { user, setUser } = useRole();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [PaymentStatus, setPaymentStatus] = useState(false);
  const [studentTimeZone, setStudentTimeZone] = useState(null);
  const [commission, setCommission] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const fetchData = async (slug) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.SpecialSlotdata(slug);
      if (response.data) {
        setData(response.data.data);
        setEmail(response.data.data?.student?.email || "");
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      console.log("error", error);
      setData(null);
      setError(true);
    }
    setLoading(false);
  };

  // Get timezone
  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    setStudentTimeZone(timeZone);
  }, []);
  // console.log("data", data);
  // console.log("user", user);

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

  const fetchCommission = async () => {
    try {
      const main = new Listing();
      const response = await main.AdminCommission();
      if (response?.data?.status) {
        const value = response?.data?.data || 0;
        setCommission(value * 0.01);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCommission();
    if (slug) {
      fetchData(slug);
    }
  }, [slug]);

  const CheckLogin = async (signal) => {
    try {
      const main = new Listing();
      const response = await main.profileVerify(signal);
      // console.log("response", response);
      if (response.data?.data?.user) {
        setUser(response.data.data.user);
      } else {
        toast.error("Please login first");
        router.push(`/login?redirect=${router.asPath}`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Please login first");
      router.push(`/login?redirect=${router.asPath}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (slug) {
      CheckLogin(signal);
    }
    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    if (!user || !data) return;
    if (user._id?.toString() !== data.student?._id?.toString()) {
      setUnauthorized(true);
    }
  }, [user, data]);

  return (
    <Layout>
      <div className="min-h-[50vh] mt-28">
        {loading ? (
          <SpecialSlotLoader />
        ) : unauthorized ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-red-100 text-red-500 flex items-center justify-center rounded-full mb-6">
              <MdErrorOutline className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-semibold text-[#CC2828] mb-2">
              Access not allowed
            </h2>

            <p className="text-gray-600 mb-2 max-w-md">
              You are not authorized to view this special slot.
            </p>

            <p className="text-gray-600 mb-4 max-w-md">
              You’re currently logged in with&nbsp;
              <span className="font-medium text-black">{user?.email}</span>.
            </p>

            <button
              onClick={() => router.push("/")}
              className="cursor-pointer mt-2 px-6 py-2 bg-[#CC2828] text-white rounded-md hover:bg-[#b82323] transition"
            >
              Go to Homepage
            </button>
          </div>
        ) : error ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-red-100 text-red-500 flex items-center justify-center rounded-full mb-6">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12A9 9 0 103 12a9 9 0 0018 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#CC2828] mb-2">
              Token Expired or Invalid Link
            </h2>
            <p className="text-gray-600 mb-4 max-w-md">
              The special slot you’re trying to access is no longer valid or has
              expired. Please request the teacher to generate a new booking link
              for you.
            </p>
            <button
              onClick={() => router.push("/")}
              className="cursor-pointer mt-2 px-6 py-2 bg-[#CC2828] text-white rounded-md hover:bg-[#b82323] transition"
            >
              Go to Homepage
            </button>
          </div>
        ) : data?.paymentStatus === "paid" ? (
          // Payment Already Done Section
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-6">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Payment Already Completed
            </h2>
            <p className="text-gray-600 mb-4 max-w-md">
              The payment for this special slot has already been made. You’ll
              receive confirmation details via email shortly.
            </p>
            <button
              onClick={() => router.push("/")}
              className="cursor-pointer mt-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Go to Homepage
            </button>
          </div>
        ) : (
          <>
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
                      PaymentStatus === true
                        ? "border-red-300"
                        : "border-red-400"
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
                      PaymentStatus === true
                        ? "border-red-400"
                        : "border-red-300"
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
                    src={data?.teacher?.profile_photo || "/Placeholder.png"}
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
                      {getDurationInMinutes(
                        data?.startDateTime,
                        data?.endDateTime
                      )}{" "}
                      mins
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {new Date(data?.startDateTime).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      -{" "}
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
                      {formatMultiPrice(
                        data?.amount + commission * data?.amount,
                        "USD"
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{`Included processing fee of ${formatMultiPrice(
                    commission * data?.amount,
                    "USD"
                  )}`}</p>
                </div>

                {PaymentStatus === false ? (
                  <Payment
                    PricePayment={data?.amount + commission * data?.amount}
                    processingFee={data?.amount * commission}
                    adminCommission={0.1 * data?.amount}
                    selectedLesson={data?.lesson}
                    selectedSlot={data?.startDateTime}
                    studentTimeZone={studentTimeZone}
                    email={email}
                    isSpecialSlot={true}
                    specialSlotData={data}
                  />
                ) : (
                  <Stripe
                    PricePayment={data?.amount + commission * data?.amount}
                    processingFee={data?.amount * commission}
                    adminCommission={0.1 * data?.amount}
                    selectedLesson={data?.lesson}
                    selectedSlot={data?.startDateTime}
                    studentTimeZone={studentTimeZone}
                    email={email}
                    isSpecialSlot={true}
                    specialSlotData={data}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
