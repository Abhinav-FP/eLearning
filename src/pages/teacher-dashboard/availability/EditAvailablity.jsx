import React, { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import Popup from "@/pages/common/Popup";
import moment from "moment";

export default function EditAvailablity({
  isOpen,
  onClose,
  TeacherAvailabilitys,
  selectedEvent,
}) {
//   const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    startDateTime: "",
    endDateTime: "",
  });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


  useEffect(() => {
  if (selectedEvent?.start && selectedEvent?.end) {
    const formatForInput = (dateStr) => {
      return moment(dateStr).format("YYYY-MM-DDTHH:mm");
    };

    const endWithExtraMinute = moment(selectedEvent.end).add(1, "minute");

    setFormData({
      startDateTime: formatForInput(selectedEvent.start),
      endDateTime: formatForInput(endWithExtraMinute),
    });
  }
}, [selectedEvent]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);
//     try {
//       const main = new Listing();
//       const response = await main.EditAvailability(selectedEvent?.id, {
//         startDateTime: formData?.startDateTime,
//         endDateTime: formData?.endDateTime,
//       });
//       if (response?.data?.status) {
//         toast.success(response.data.message);
//         setFormData({
//           title: "",
//           description: "",
//           price: "",
//           duration: "",
//         });
//         TeacherAvailabilitys();
//         onClose();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("API error:", error);
//       toast.error(error?.response?.data?.message || "Something went wrong!");
//       setLoading(false);
//     }
//     setLoading(false);
//   };

  const Id = selectedEvent?.id;

  const handleDelete = () => {
    setProcessing(true);
    const main = new Listing();
    main
      .deleteAvailability(Id)
      .then((r) => {
        toast.success(r?.data?.message);
        TeacherAvailabilitys();
        setProcessing(false);
        onClose();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log("error", err);
        setProcessing(false);
      });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      <div className="mx-auto bg-white rounded-xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#CC2828] py-4 border-b border-gray-200">
          Availability Details
        </h2>

        <div className="px-5 py-4 space-y-3">
          {/* Start Time */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Start Time</span>
            <span className="text-gray-800">
              {formData.startDateTime
                ? moment(formData.startDateTime).format("DD MMM YYYY, hh:mm A")
                : "N/A"}
            </span>
          </div>

          {/* End Time */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">End Time</span>
            <span className="text-gray-800">
               {formData.endDateTime
                ? moment(formData.endDateTime).format("DD MMM YYYY, hh:mm A")
                : "Not selected"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-5">
            {/* <button
              type="submit"
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 text-sm font-medium"
            >
              {loading ? "Updating..." : "Update"}
            </button> */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={processing}
              className="cursor-pointer flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              {processing ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}
