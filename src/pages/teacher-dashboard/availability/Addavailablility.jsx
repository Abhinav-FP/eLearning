import Listing from '@/pages/api/Listing';
import Popup from '@/pages/common/Popup';
import React, { useEffect, useState } from 'react'

export default function Addavailablility({ isOpen, onClose, data, getLessons }) {
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
        getLessons();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.LessonUpdate(data?._id, {
        endDateTime: formData?.endDateTime,
        startDateTime: formData?.startDateTime,
      });
      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          endDateTime: "",
          startDateTime: "",
        });
        getLessons();
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
    setFormData({
      title: data?.title || "",
      description: data?.description || "",
      price: data?.price || "",
      duration: data?.duration || "",
    });
  }, [data]);
  console.log("data", data);
  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      <form
        onSubmit={data ? handleUpdate : handleAdd}
        className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#CC2828]">
          {data ? "Edit Availability" : "Add Availability"}
        </h2>
        {/* Title Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">Start Date and time</label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
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
            value={formData.endDateTime}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          {data ? (
            <button
              type="submit"
              className="cursor-pointer flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          ) : (
            <button
              type="submit"
              className="cursor-pointer flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer flex-1 border border-red-600 text-red-600 py-2 rounded-md hover:bg-red-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </Popup>
  )
}
