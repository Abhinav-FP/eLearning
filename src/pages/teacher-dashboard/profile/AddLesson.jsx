import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";

export default function AddLesson({ isOpen, onClose, data, getLessons }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
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
      const response = await main.LessonAdd({
        title: formData?.title,
        description: formData?.description,
        duration: formData?.duration,
        price: formData?.price,
      });

      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          title: "",
          description: "",
          price: "",
          duration: "",
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
        title: formData?.title,
        description: formData?.description,
        duration: formData?.duration,
        price: formData?.price,
      });
      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          title: "",
          description: "",
          price: "",
          duration: "",
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

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <form
        onSubmit={data ? handleUpdate : handleAdd}
        className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#CC2828]">
          {data ? "Edit Lesson" : "Add lesson"}
        </h2>
        {/* Title Field */}
        {/* Title Field with 50 character limit */}
        <div>
          <label className="flex justify-between text-[#CC2828] font-medium mb-1">
            Title <span className="text-sm text-gray-500">({formData.title.length}/50)</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => {
              if (e.target.value.length <= 50) handleChange(e);
            }}
            placeholder="Enter title"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>

        {/* Description Field changed to textarea with 300 character limit */}
        <div>
          <label className="flex justify-between text-[#CC2828] font-medium mb-1">
            <span>Description</span>
            <span className="text-sm text-gray-500">({formData.description.length}/300)</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => {
              if (e.target.value.length <= 300) handleChange(e);
            }}
            placeholder="Enter description"
            rows={10}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">
            Price (In USD)
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={(e) => {
              if (
                /^[0-9]*$/.test(e.target.value)
              ) {
                handleChange(e);
              }
            }}
            maxLength="7"
            placeholder="Enter price"
            required

            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
          />
        </div>
        {/* Duration Field */}
        <div>
          <label className="block text-[#CC2828] font-medium mb-1">
            Duration
          </label>

          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="duration"
                value="30"
                checked={formData.duration == "30"}
                onChange={handleChange}
                required
              />
              <span>30 minutes</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="duration"
                value="50"
                checked={formData.duration == "50"}
                onChange={handleChange}
                required

              />
              <span>50 minutes</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="duration"
                required

                value="custom"
                checked={
                  formData.duration != "30" && formData.duration != "50"
                }
                onChange={() =>
                  handleChange({ target: { name: "duration", value: "" } })
                }
              />
              <span>Custom:</span>
              <input
                type="text"
                name="duration"
                value={
                  formData.duration != "30" && formData.duration != "50"
                    ? formData.duration
                    : ""
                }
                onChange={handleChange}
                placeholder="Enter duration"
                className="ml-2 p-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
              />
            </label>
          </div>
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
  );
}
