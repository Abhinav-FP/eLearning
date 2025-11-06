import React, { useState } from "react";
import toast from "react-hot-toast";
import Listing from "@/pages/api/Listing";
import Popup from "@/pages/common/Popup";

export default function DeleteCourse({ isOpen, onClose, Id, fetchData }) {
  const [loading, setLoading] = useState(false);
  //   console.log("id", Id);

  const deleteCourse = () => {
    setLoading(true);
    const main = new Listing();
    main
      .AdminCourseDelete(Id)
      .then((r) => {
        toast.success(r?.data?.message);
        fetchData();
        setLoading(false);
        onClose();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log("error", err);
        setLoading(false);
      });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      <div className="relative bg-[#FFFFFF] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[500px]">
        <p className="text-black mb-[6px] text-[12px] sm:text-[14px] md:text-[17px] font-[400] text-left">
          Are you sure you want to disable this course?
        </p>
        <p className="mb-[20px] text-[12px] sm:text-[12px] md:text-[15px] font-[400] text-left text-[#f00000]">
          (Don’t worry, you can enable it back on anytime)
        </p>
        <div className="flex justify-end gap-[8px]">
          <button
            type="button"
            onClick={onClose}
            className="text-black mr-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={deleteCourse}
            className="bg-red-600 hover:bg-red-500 font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center cursor-pointer"
          >
            {loading ? "Disabling..." : "Disable"}
          </button>
        </div>
      </div>
    </Popup>
  );
}
