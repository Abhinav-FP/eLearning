import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";

export default function AddSlot({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student: "",
    lesson: "",
    amount: "",
    startDateTime: "",
    endDateTime: "",
  });
  const [data, setData]=useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.LessonAdd({
        student: formData.student,
        lesson: formData.lesson,
        amount: formData.amount,
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
        // getLessons();
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
    // setLoading(true);
    const main = new Listing();
    main
      .TeacherStudentLesson()
      .then((r) => {
        console.log("r", r?.data)
        setData(r?.data?.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
        setData({});
      });
  }, []);

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <form
        onSubmit={handleAdd}
        className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#CC2828]">
          Create Special Slot
        </h2>

        {/* Student Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">Select Student</label>
           <select
             name="student"
             value={formData.student}
             onChange={handleChange}
             className="capitalize w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
             required
           >
             <option value="">Select a student </option>
             {data && data?.students && data?.students?.map((item,index)=>(
             <option key={index} value={item?._id}
             >
              {item?.name}
             </option>
             ))}
           </select>
        </div>

        {/* Lesson Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">Select Lesson</label>
          <select
            name="lesson"
            value={formData.lesson}
            onChange={handleChange}
            className="capitalize w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          >
            <option value=""> Select a Lesson </option>
            {data && data?.lessons && data?.lessons?.map((item,index)=>(
             <option key={index} value={item?._id}>{item?.title}</option>
             ))}
          </select>
        </div>

        {/* Amount Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">Amount (USD)</label>
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
          <label className="block text-[#CC2828] font-medium mb-1">Start Date & Time</label>
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
          <label className="block text-[#CC2828] font-medium mb-1">End Date & Time</label>
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
       <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-200"
        >
          {loading ? "Adding..." : "Create Slot"}
        </button>
      </div>
      </form>
    </Popup>
  );
}