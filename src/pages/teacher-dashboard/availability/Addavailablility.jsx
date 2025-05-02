import Listing from '@/pages/api/Listing';
import Popup from '@/pages/common/Popup';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Addavailablility({ isOpen, onClose, TeacherAvailabilitys }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDateTime: "",
    endDateTime: "",
  });

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
    if (new Date(formData.endDateTime) <= new Date(formData.startDateTime)) {
      toast.error("End date/time must be after start date/time");
      return;
  }
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.AddAvailablility({
        startDateTime: formData?.startDateTime,
        endDateTime: formData?.endDateTime,
      });

      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          startDateTime: "",
          endDateTime: "",
        });
        TeacherAvailabilitys();
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

  console.log("formData",formData);



  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      <form
        onSubmit={handleAdd}
        className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#CC2828]">
          {"Add Availability"}
        </h2>
        {/* Title Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">Start Date and time</label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)} 
            placeholder="Enter start date and time"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>
        {/* Description Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">
            End Date and time
          </label>
          <input
            type="datetime-local"
            name="endDateTime"
            min={new Date().toISOString().slice(0, 16)} 
            value={formData.endDateTime}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            className="cursor-pointer flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </Popup>
  )
}
