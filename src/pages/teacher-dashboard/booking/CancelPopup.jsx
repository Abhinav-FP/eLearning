import React, { useState } from "react";
import Popup from "@/pages/common/Popup";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import Listing from "@/pages/api/Listing";

export default function CancelPopup({ data, fetchEarnings }) {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // if (!data) return null;

  // console.log("data", data);

  const handleCancel = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.BookingCancel(id);
      if (response?.data?.status) {
        // console.log("response?.data",response?.data);
        toast.success(response.data.message);
        fetchEarnings();
        setShowPopup(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm lg:text-base font-medium font-inter transition duration-200 cursor-pointer"
      >
        Cancel it
      </button>

      {showPopup && (
        <Popup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          size="max-w-md"
        >
          <div className="px-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Cancel Lesson?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel this lesson? <br />
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                onClick={() => {
                  handleCancel(data?._id);
                }}
              >
                {loading ? "Cancelling..." :"Yes, Cancel"}
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}
