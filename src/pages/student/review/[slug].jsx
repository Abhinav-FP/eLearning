import React, { useState } from 'react';
import StudentLayout from '../Common/StudentLayout';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';

export default function Index() {
  const router = useRouter();
  console.log("router", router?.query?.slug)
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
    <StudentLayout page="Add Review">
      <div className="min-h-screen p-5 lg:p-[30px]">
        <h1 className="font-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-2">Write a Review</h1>
        <div className="border-b border-[rgba(0,0,0,.1)]  py-6 lg:py-8 space-y-4 lg:space-y-6">

          <form onSubmit={handleSubmit} >
            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-yellow-400 ${star <= rating ? 'fill-yellow-500' : 'fill-gray-300'
                      }`}
                  >
                    <FaStar
                      className={`w-8 h-8 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      fill={star <= rating ? '#facc15 border-#facc15 border-2' : '#000000 border-gray-300 border-2'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Write your review..."
                className="w-full  font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full max-w-[183px] cursor-pointer border border-[#CC2828] bg-[#CC2828] hover:bg-red-700  text-white py-3.5 cursor-pointer rounded-[10px] font-normal text-base xl:text-xl transition  tracking-[-0.04em]"

            >
              {processing ? "Loading..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
}
