import React, { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import Popup from "@/pages/common/Popup";
import moment from "moment";

export default function EditAvailablity({
  isOpen,
  onClose,
  TeacherAvailabilitys,
  selectedEvents = [],   // always an array now
}) {
  const [processing, setProcessing] = useState(false);

  const isBulk = selectedEvents.length > 1;

  // For single event display
  const singleEvent = selectedEvents[0];

  const formatDisplay = (date) =>
    date ? moment(date).format("DD MMM YYYY, hh:mm A") : "N/A";

  // Add 1 minute back to end for display (since you subtract 1 sec on creation)
  const getEndDisplay = (end) =>
    end ? moment(end).add(1, "minute").format("DD MMM YYYY, hh:mm A") : "N/A";

  const handleDelete = async () => {
    setProcessing(true);
    try {
      const ids = selectedEvents.map((e) => e.id); // always array
      const main = new Listing();
      const response = await main.deleteAvailability({
        slots: ids
      }); // send array
      toast.success(response?.data?.message || "Deleted successfully");
      TeacherAvailabilitys();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      <div className="mx-auto bg-white rounded-xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#55844D] py-4 border-b border-gray-200">
          {isBulk ? `${selectedEvents.length} Slots Selected` : "Availability Details"}
        </h2>

        <div className="px-5 py-4 space-y-3">

          {/* SINGLE EVENT VIEW */}
          {!isBulk && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Start Time</span>
                <span className="text-gray-800">
                  {formatDisplay(singleEvent?.start)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">End Time</span>
                <span className="text-gray-800">
                  {getEndDisplay(singleEvent?.end)}
                </span>
              </div>
            </>
          )}

          {/* BULK EVENT VIEW */}
          {isBulk && (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {selectedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="flex justify-between items-center bg-[#f4faf3] border border-[#6ABB52] rounded-lg px-3 py-2"
                >
                  <span className="text-[#55844D] font-medium text-sm">
                    Slot {index + 1}
                  </span>
                  <div className="text-right text-sm text-gray-700">
                    <div>{formatDisplay(event.start)}</div>
                    <div className="text-gray-400 text-xs">
                      → {getEndDisplay(event.end)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Warning for bulk */}
          {isBulk && (
            <p className="text-xs text-red-400 text-center pt-1">
              All {selectedEvents.length} slots will be permanently deleted.
            </p>
          )}

          {/* Delete Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={processing}
              className="cursor-pointer flex-1 bg-[#55844D] text-white py-2 rounded-md hover:bg-[#3d5e37] font-medium"
            >
              {processing
                ? "Deleting..."
                : isBulk
                ? `Delete ${selectedEvents.length} Slots`
                : "Delete Slot"}
            </button>
          </div>

        </div>
      </div>
    </Popup>
  );
}