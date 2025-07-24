import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';
import Tippayment from "./tippaypal";
import StudentLayout from '../Common/StudentLayout';
import StripeTips from './StripeTips';

export default function Index() {
  const router = useRouter();
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const [processing, setProcessing] = useState('');
  const [PaymentStatus, setPaymentStatus] = useState(false)
  const [Tips, setTips] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    try {
      const main = new Listing();
      const response = await main.AddReview({
        bookingId: router?.query?.slug,
        rating: rating,
        description: description
      });
      if (response) {
        toast.success(response.data.message);
      }
      setProcessing(false);
      setRating(0);
      setDescription('');
      FecthData();
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error({
        401: "Unauthorized",
        403: "Access denied.",
        404: message,
        500: "Server error. Please try again later."
      }[status] || message);
    }
    setProcessing(false);
  };

  const [amount, setAmount] = useState();

  const handleamountChange = (e) => {
    setAmount(e.target.value);
  };

  const [loading, setLoading] = useState(false);
  const [BookinData, setBookingdata] = useState("");

  const FecthData = async () => {
    if (router.query.slug) {
      setLoading(true);
      const main = new Listing();
      const response = main.BookingId(router.query.slug);
      response.then((res) => {
        // console.log("res", res);
        setLoading(false);
        setBookingdata(res.data.data)
      })
        .catch((error) => {
          console.log("erorr", error);
          setLoading(false);
        });
    }
  }
  useEffect(() => {
    FecthData();

  }, [router?.query?.slug]);

  return (
    <StudentLayout page={"Review & Tip"}>
      {loading ? (
        <p className="text-center text-lg font-medium text-gray-500">Loading...</p>
      ) : (
        <>
          {BookinData?.ReviewId && BookinData?.BonusId ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                You’ve already submitted both a review and a tip!
              </h2>
            </div>
          ) : (
            <div className="py-12 px-4 md:px-8">

              {/* ✅ REVIEW SECTION */}
              {!BookinData?.ReviewId ? (
                <div className="mb-10">
                  <h2 className="text-center text-2xl font-bold text-[#CC2828] mb-6">Write a Review</h2>
                  <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-[#CC2828] font-semibold mb-2">Rate Your Experience</label>
                      <div className="flex justify-center gap-3">
                        {[1, 2, 3].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`cursor-pointer hover:scale-110 transition ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                          >
                            <FaStar className="w-8 h-8" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#CC2828] font-semibold mb-2">
                        Your Review <span>({description.length}/300)</span>
                      </label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => {
                          const input = e.target.value;
                          setDescription(input.slice(0, 300));
                        }}
                        required
                        placeholder="Please enter your review"
                        className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#CC2828] resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-[#CC2828] hover:bg-red-700 text-white py-3 rounded-lg text-lg font-medium transition disabled:opacity-50 cursor-pointer"
                    >
                      {processing ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              ) : (
                <p className="text-center text-green-600 font-medium text-lg mb-8">
                  ✅ You’ve already submitted a review.
                </p>
              )}

              {/* ✅ TIP SECTION */}
              {!BookinData?.BonusId && !Tips && (
                <p
                  className="text-center text-[#CC2828] font-semibold cursor-pointer hover:text-black"
                  onClick={() => setTips(true)}
                >
                  Would you like to send a tip to the teacher?
                </p>
              )}

              {BookinData?.BonusId && (
                <p className="text-center text-green-600 font-medium text-lg mb-8">
                  ✅ You’ve already sent a tip.
                </p>
              )}

              {Tips && !BookinData?.BonusId && (
                <div className="pt-[89px] md:pt-[95px] lg:pt-[110px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
                  <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center mx-auto">
                    <h1 className="font-inter text-2xl lg:text-3xl font-bold text-[#CC2828] tracking-[-0.04em] mb-3">
                      Paying Tips for Teachers
                    </h1>
                    <p className="text-lg font-semibold text-[#000000]">
                      As a student, you have the option to show appreciation to your teacher by offering a tip after the lesson.
                      It’s a simple way to say thank you for their time, effort, and support in your learning journey.
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Left: Payment Method */}
                    <div className="border border-[#CC2828] h-fit rounded-xl p-4 w-full md:w-1/2">
                      <h2 className="text-[#CC2828] font-semibold mb-4">Payment Method</h2>
                      <div className="space-y-4">
                        <div
                          onClick={() => setPaymentStatus(false)}
                          className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${PaymentStatus === true ? 'border-red-300' : 'border-red-400'
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
                          className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${PaymentStatus === true ? 'border-red-400' : 'border-red-300'
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
                      {/* Amount Input field */}
                      <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                          Amount
                        </label>
                        <input
                          type="number"
                          id="amount"
                          value={amount}
                          onChange={handleamountChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CC2828] focus:border-[#CC2828]"
                          placeholder="Enter your amount"
                        />
                      </div>

                      {PaymentStatus === false ? (
                        <Tippayment
                          PricePayment={amount}
                          bookingdata={BookinData}
                          IsBonus={true}
                        />
                      ) : (
                        <StripeTips
                          PricePayment={amount}
                          bookingdata={BookinData}
                          IsBonus={true}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </StudentLayout>

  );
}
