import React, { useState } from "react";
import Popup from "@/pages/common/Popup";
import toast from "react-hot-toast";
import Listing from "@/pages/api/Listing";

export default function ApproveRejectPopup({ isOpen, onClose, actionKey, id, fetchData }) {
  const [formData, setFormData] = useState({
    reason: "",
    transactionId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Optional: show loading spinner
    try {
      if (actionKey === "rejected" && !formData.reason.trim()) {
        toast.error("Please provide a reason for rejection.");
        return;
      }
      if (actionKey === "approved" && !formData.transactionId.trim()) {
        toast.error("Please enter the transaction ID.");
        return;
      }
      const main = new Listing();

      const payload = {
        status: actionKey,
        ...(actionKey === "approved" && { transactionId: formData.transactionId }),
        ...(actionKey === "rejected" && { reason: formData.reason }),
      };
      const response = await main.AdminPayoutAction(id, payload);
      if (response?.data?.status) {
        toast.success(response.data.message);
        onClose();
        fetchData();
      } else {
        toast.error(response.data.message);
      }
      setFormData({
        reason: "",
        transactionId: "",
      });
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }

    setLoading(false);
  };


  return (
    <Popup isOpen={isOpen} onClose={onClose} size="max-w-[510px]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg lg:text-xl font-semibold capitalize text-center">
          {actionKey === "approved" ? "Approve" : "Reject"} Request
        </h2>
        {actionKey === "rejected" && (
          <div>
            {/* <label className="block text-[#535353] font-medium text-sm xl:text-base  tracking-[-0.04em] mb-0 text-center" 
              htmlFor="reason">
              Reason for Rejection
            </label> */}
            <textarea
              name="reason"
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Please enter a reason for rejection"
              rows="4"
              required
            />
          </div>
        )}

        {actionKey === "approved" && (
          <div>
            {/* <label className="block text-sm font-medium mb-1" htmlFor="transactionId">
              Transaction ID
            </label> */}
            <input
              type="text"
              name="transactionId"
              id="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              placeholder="Transaction Id of payment"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="border-[#55844D] bg-[#55844D] hover:bg-[#3d5e37]  text-white px-4 py-2 rounded cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </Popup>
  );
}
