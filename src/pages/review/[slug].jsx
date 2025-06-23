import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';
import Layout from '@/pages/common/Layout';

export default function Index() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [processing, setProcessing] = useState('');

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
      console.log("response", response)
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

  return (
    <Layout>
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
    </Layout>
  );
}
