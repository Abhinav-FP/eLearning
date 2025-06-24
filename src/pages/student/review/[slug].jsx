import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';
import Layout from '@/pages/common/Layout';
import Tippayment from "./tippaypal";
import StudentLayout from '../Common/StudentLayout';

export default function Index() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [processing, setProcessing] = useState('');
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
      router.push("/student/review")
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
  useEffect(() => {
    if (router.query.slug) {
      setLoading(true);
      const main = new Listing();
      const response = main.BookingId(router.query.slug);
      response.then((res) => {
        console.log("res", res);
        setLoading(false);
        setBookingdata(res.data.data)
      })
        .catch((error) => {
          console.log("erorr", error);
          setLoading(false);
        });
    }

  }, [router?.query?.slug]);

  const [PaymentStatus, setPaymentStatus] = useState(false)


  return (
    <StudentLayout >
      <div className="flex items-start justify-center  pt-[89px] md:pt-[95px] lg:pt-[110px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
        <div className="w-full max-w-2xl ">
          {/* Heading */}
          <h1 className="text-center font-inter text-2xl lg:text-3xl font-bold text-[#CC2828] tracking-[-0.04em] mb-3 ">
            Write a Review
          </h1>
          {/* Form Container */}
          <div className=" pb-6 lg:pb-8">
            <form onSubmit={handleSubmit} className="bg-white  space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-[#CC2828] text-lg font-semibold mb-2">Rate Your Experience</label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`transition transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                      <FaStar className="w-8 h-8" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#CC2828] text-lg font-semibold mb-2">
                  Your Review{" "}
                  <span>({description.length}/300)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      setDescription(e.target.value);
                    }
                  }}
                  rows={4}
                  placeholder="Share your thoughts about the session..."
                  className="w-full border border-gray-200 rounded-lg p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CC2828] resize-none"
                />

                <p
                  className="block text-[#CC2828] text-lg font-semibold mb-2 hover:text-black cursor-pointer"
                  onClick={() => setTips(true)}
                >
                  Are you paying tips to the teacher?
                </p>

              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#CC2828] hover:bg-red-700 text-white py-3 rounded-lg text-lg font-medium transition duration-200 disabled:opacity-50"
              >
                {processing ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>


      </div>
      <>
        {Tips && (
          <div className="  pt-[89px] md:pt-[95px] lg:pt-[110px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
            <div className="flex items-start justify-center w-full max-w-2xl ">
              <h1 className="text-center font-inter text-2xl lg:text-3xl font-bold text-[#CC2828] tracking-[-0.04em] mb-3 ">
                Paying Tips for Teachers
              </h1>
              <p className="text-center text-lg font-semibold text-[#000000]">
                Teachers often pay tips for their students. In the context of this platform, you can offer tips to your students for teaching.
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

                {/* amount Input field */}
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                    amount Address for Payment
                  </label>
                  <input
                    type="Number"
                    id="number"
                    value={amount}
                    onChange={handleamountChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CC2828] focus:border-[#CC2828]"
                    placeholder="Enter your amount"
                  />
                </div>

                {PaymentStatus === false ? (
                  <Tippayment PricePayment={amount} bookingdata={BookinData}
                    isbouns={true}
                  />
                ) : (
                  <></>
                  // <Stripe PricePayment={selectedLesson?.price + commission * selectedLesson?.price} adminCommission={commission * selectedLesson?.price} selectedLesson={selectedLesson} selectedSlot={selectedSlot} studentTimeZone={studentTimeZone} amount={amount} />
                )}
              </div>
            </div>
          </div>

        )}
      </>

    </StudentLayout>
  );
}
