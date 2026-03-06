import React, { useState } from "react";
import axios from "axios";
import Popup from "@/pages/common/Popup";
import { formatMultiPrice } from "@/components/ValueDataHook";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";

export default function BulkEdit({ isOpen, onClose, bulk, fetchEarnings }) {
  const [actionType, setActionType] = useState("");
  const [lessonsChanged, setLessonsChanged] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [sendNotification, setSendNotification] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log("bulk", bulk);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!actionType || !reason) {
      alert("Action type and reason are required");
      return;
    }
    setLoading(true);
    // try {
    //   await axios.patch(`/api/admin/bulk/${bulk?._id}`, {
    //     actionType,
    //     lessonsChanged: Number(lessonsChanged),
    //     refundAmount: Number(refundAmount),
    //     reason,
    //     sendNotification,
    //   });

    //   alert("Bulk updated successfully");
    //   window.location.reload();
    // }
    try {
      const main = new Listing();
      const response = await main.AdminBulkEdit(bulk?._id, {
        actionType,
        lessonsChanged: Number(lessonsChanged),
        refundAmount: Number(refundAmount),
        reason,
        sendNotification,
      });

      if (response?.data?.status) {
        toast.success(response.data.message);
        fetchEarnings();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } 
     catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <div className="mx-auto bg-white p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-[#000] mb-6">
          Edit Bulk Purchase
        </h2>

        {/* Bulk Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-[#333]">
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium">{bulk?.status}</p>
          </div>

          <div>
            <p className="text-gray-500">Total Lessons</p>
            <p className="font-medium">{bulk?.totalLessons}</p>
          </div>

          <div>
            <p className="text-gray-500">Lessons Remaining</p>
            <p className="font-medium">{bulk?.lessonsRemaining}</p>
          </div>

          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="font-medium">{formatMultiPrice(bulk?.totalAmount - bulk?.processingFee, "USD") || ""}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Action Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#000]">
              Action Type
            </label>

            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="w-full h-[44px] border border-[#ddd] px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D]"
              required
            >
              <option value="">Select Action</option>
              <option value="adjust_credits">Adjust Credits</option>
              <option value="refund">Refund (Manual Stripe)</option>
              <option value="cancel">Cancel Bulk</option>
            </select>
          </div>

          {/* Adjust Credits */}
          {actionType === "adjust_credits" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-[#000]">
                Lessons Change (+/-)
              </label>

              <input
                type="number"
                value={lessonsChanged}
                onChange={(e) => setLessonsChanged(e.target.value)}
                className="w-full h-[44px] border border-[#ddd] px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D]"
              />
            </div>
          )}

          {/* Refund */}
          {actionType === "refund" && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-[#000]">
                  Refund Amount
                </label>

                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full h-[44px] border border-[#ddd] px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-[#000]">
                  Lessons to Deduct
                </label>

                <input
                  type="number"
                  value={lessonsChanged}
                  onChange={(e) => setLessonsChanged(e.target.value)}
                  className="w-full h-[44px] border border-[#ddd] px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D]"
                />
              </div>
            </>
          )}

          {/* Cancel Message */}
          {actionType === "cancel" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              This will cancel the bulk package and remove all remaining
              credits.
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#000]">
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4"
              className="w-full border border-[#ddd] px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D]"
              required
            />
          </div>

          {/* Notification */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sendNotification}
              onChange={() => setSendNotification(!sendNotification)}
              className="accent-[#55844D]"
            />

            <label className="text-sm text-[#000]">
              Send notification to student
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[44px] bg-[#55844D] text-white border border-[#55844D] rounded-md text-sm font-medium tracking-[-0.06em] hover:bg-white hover:text-[#55844D] transition cursor-pointer"
          >
            {loading ? "Updating..." : "Update Bulk"}
          </button>
        </form>
      </div>
    </Popup>
  );
}
