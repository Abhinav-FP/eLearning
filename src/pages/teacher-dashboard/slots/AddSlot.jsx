import React, { useEffect, useRef, useState } from "react";
import Popup from "@/pages/common/Popup";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import { MdInfoOutline } from "react-icons/md";

export default function AddSlot({ isOpen, onClose, SpecialSlotData }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student: "",
    lesson: "",
    amount: "",
    startDateTime: "",
    endDateTime: "",
  });
  const [filteredStudents, setfilteredStudents] = useState(null);
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const now = new Date();
    const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    if (name === "startDateTime") {
      const start = new Date(value);
      if (start < threeHoursFromNow) {
        toast.error("Start time must be at least 3 hours from now.");
        return;
      }
    }

    if (name === "endDateTime") {
      const start = new Date(formData.startDateTime);
      const end = new Date(value);

      if (end <= start) {
        toast.error("End time must be after start time.");
        return;
      }

      if (end < threeHoursFromNow) {
        toast.error("End time must be at least 3 hours from now.");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData?.amount || Number(formData.amount) <= 0) {
      toast.error("Price cannot be zero");
      return;
    }
    const amountNum = Number(formData.amount);
    if (loading) return;
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.SpecialSlot({
        student: formData.student,
        lesson: formData.lesson,
        amount: amountNum || formData.amount,
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
      });

      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          student: "",
          lesson: "",
          amount: "",
          startDateTime: "",
          endDateTime: "",
        });
        SpecialSlotData();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
    }
    setLoading(false);
  };

  const handleZeroAmountSlot = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.FreeSpecialSlot({
        student: formData.student,
        lesson: formData.lesson,
        amount: 0,
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
      });

      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          student: "",
          lesson: "",
          amount: "",
          startDateTime: "",
          endDateTime: "",
        });
        SpecialSlotData();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const main = new Listing();
    main
      .TeacherStudentLesson()
      .then((r) => {
        setData(r?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        setData({});
      });
  }, []);

  useEffect(() => {
    setfilteredStudents(
      data?.students?.filter((student) =>
        student?.name?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const handleStudentSelect = (student) => {
    setFormData((prev) => ({
      ...prev,
      student: student._id,
    }));
    setSearch(student?.name);
    setIsFocused(false);
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <form
        onSubmit={formData?.amount && Number(formData?.amount) <= 0 ? handleZeroAmountSlot : handleAdd}
        className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#CC2828]">
          Create Special Slot
        </h2>

        {/* Student Field */}
        <div className="mb-6 relative z-10">
          <label className="block text-[#CC2828] font-medium mb-2">
            Select Student
          </label>
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            // onBlur={()=>{setIsFocused(false)}}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
          />

          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-md rounded-md max-h-60 overflow-y-auto border border-gray-200 z-50">
              {filteredStudents && filteredStudents?.length > 0 ? (
                filteredStudents?.map((student) => (
                  <div
                    key={student?._id}
                    // onClick={() => handleStudentSelect(student)}
                    onMouseDown={() => handleStudentSelect(student)}
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                      formData?.student === student?._id ? "bg-gray-300" : ""
                    }`}
                  >
                    <img
                      src={student?.profile_photo || "/Placeholder.png"}
                      alt={student?.name}
                      className="min-w-10 w-10 min-h-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-gray-800">
                      <div className="capitalize">{student?.name}</div>
                      <div className="text-sm text-gray-500">
                        {student?.email}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-3 text-gray-500">No students found</p>
              )}
            </div>
          )}
        </div>

        {/* Lesson Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">
            Select Lesson
          </label>
          <select
            name="lesson"
            value={formData.lesson}
            onChange={handleChange}
            className="capitalize w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          >
            <option value=""> Select a Lesson </option>
            {data &&
              data?.lessons &&
              data?.lessons?.map((item, index) => (
                <option key={index} value={item?._id}>
                  {item?.title}
                </option>
              ))}
          </select>
        </div>

        {/* Amount Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">
            Amount (USD)
          </label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={(e) => {
              if (/^[0-9]*$/.test(e.target.value)) handleChange(e);
            }}
            maxLength="7"
            placeholder="Enter amount"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>

        {/* Start Time Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>

        {/* End Time Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center mt-6 space-y-2">
          {formData?.amount && Number(formData?.amount) <= 0 ? (
            <>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#FFE8E8] text-[#C62828] font-medium py-2 px-6 rounded-md border border-[#F5B7B1] hover:bg-[#FFDADA] transition duration-200 cursor-pointer shadow-sm"
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <MdInfoOutline className="text-[#C62828] text-lg" />
                    Create Slot with 0 Amount
                  </>
                )}
              </button>
              <p className="text-sm text-[#B71C1C] text-center max-w-md leading-relaxed">
                You're about to create a <strong>free slot</strong> for which the student
                will not be required to pay. No payment history will be generated for this slot.
              </p>
            </>
          ) : (
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-200 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Slot"}
            </button>
          )}
        </div>
      </form>
    </Popup>
  );
}
