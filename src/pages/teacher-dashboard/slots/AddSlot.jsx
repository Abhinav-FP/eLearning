import React, { useEffect, useRef, useState } from "react";
import Popup from "@/pages/common/Popup";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import { MdInfoOutline } from "react-icons/md";
import moment from "moment";

export default function AddSlot({ isOpen, onClose, SpecialSlotData }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student: "",
    lesson: "",
    amount: "",
    startDateTime: "",
    endDateTime: "",
  });
  const [useBulkCredit, setUseBulkCredit] = useState(false);
  const [filteredStudents, setfilteredStudents] = useState(null);
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const now = moment();
    const thirtyMinutesFromNow = moment().add(10, "minutes");

    if (name === "startDateTime") {
      const start = moment(value);

      if (!start.isValid()) {
        toast.error("Invalid start date/time.");
        return;
      }

      if (start.isBefore(thirtyMinutesFromNow)) {
        toast.error(
          `Start time must be at least 10 minutes from now (${thirtyMinutesFromNow.format(
            "DD/MM/YYYY hh:mm A"
          )}).`
        );
        return;
      }
    }

    if (name === "endDateTime") {
      const start = moment(formData.startDateTime);
      const end = moment(value);

      if (!end.isValid()) {
        toast.error("Invalid end date/time.");
        return;
      }

      if (start.isValid() && end.isSameOrBefore(start)) {
        toast.error("End time must be after start time.");
        return;
      }

      if (end.isBefore(thirtyMinutesFromNow)) {
        toast.error(
          `End time must be at least 10 minutes from now (${thirtyMinutesFromNow.format(
            "DD/MM/YYYY hh:mm A"
          )}).`
        );
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

  const handleSlotFromBulkCredit = async(e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    console.log("Creating slot with bulk credit...");
    try {
      const main = new Listing();
      const response = await main.SpecialSlotUsingBulk({
        student: formData.student,
        lesson: formData.lesson,
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
        onSubmit={useBulkCredit ? handleSlotFromBulkCredit : formData?.amount && Number(formData?.amount) <= 0 ? handleZeroAmountSlot : handleAdd}
        className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#55844D]">
          Create Special Slot
        </h2>

        {/* Student Field */}
        <div className="mb-6 relative z-10">
          <label className="block text-[#55844D] font-medium mb-2">
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
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
            required
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
          <label className="block text-[#55844D] font-medium mb-1">
            Select Lesson
          </label>
          <select
            name="lesson"
            value={formData.lesson}
            onChange={handleChange}
            className="capitalize w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
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
          <label className="block text-[#55844D] font-medium mb-1">
            Amount (USD)
          </label>

          <div className="relative">
            <input
              type="text"
              name="amount"
              value={formData.amount}
              disabled={useBulkCredit}
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value)) handleChange(e);
              }}
              maxLength="7"
              placeholder="Enter amount"
              className={`w-full p-3 rounded-md text-gray-700 transition
                ${
                  useBulkCredit
                    ? "bg-gray-200 border-2 border-gray-400 cursor-not-allowed text-gray-500 focus:ring-0"
                    : "bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
                }
              `}
              required={!useBulkCredit}
            />

            {useBulkCredit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                Disabled
              </span>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="useBulkCredit"
              checked={useBulkCredit}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  amount: "",
                }));
                setUseBulkCredit(e.target.checked);
              }}
              className="w-4 h-4 accent-[#55844D]"
            />
            <label
              htmlFor="useBulkCredit"
              className="text-sm text-gray-700 cursor-pointer"
            >
              Use bulk lesson credit for payment instead
            </label>
          </div>

          {useBulkCredit && (
            <p className="text-xs text-gray-500 mt-1">
              Payment will be adjusted using the student’s bulk lesson credits.
            </p>
          )}
        </div>

        {/* Start Time Field */}
        <div>
          <label className="block text-[#55844D] font-medium mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
            required
          />
        </div>

        {/* End Time Field */}
        <div>
          <label className="block text-[#55844D] font-medium mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center mt-6 space-y-2">
          {formData?.amount && Number(formData?.amount) <= 0 ? (
            <>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#55844D] text-white font-medium py-2 px-6 rounded-md hover:bg-[#3d5e37] transition duration-200 cursor-pointer shadow-sm"
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <MdInfoOutline className="text-white text-lg" />
                    Create Slot with 0 Amount
                  </>
                )}
              </button>
              <p className="text-sm text-[#CC2828] text-center max-w-md leading-relaxed">
                You're about to create a <strong>free slot</strong> for which the student
                will not be required to pay. No payment history will be generated for this slot.
              </p>
            </>
          ) : (
            <button
              type="submit"
              className="bg-[#55844D] text-white py-2 px-6 rounded-md hover:bg-[#3d5e37] transition duration-200 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Slot"}
            </button>
          )}
        </div>
      </form>
    </Popup>
  );
}
