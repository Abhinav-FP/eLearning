import Listing from "@/pages/api/Listing";
import Popup from "@/pages/common/Popup";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddCourse({ isOpen, onClose, data = null, fetchData }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!formData.thumbnail) {
      toast.error("Please upload an image before submitting!");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const main = new Listing();
      const course = new FormData();
      course.append("title", formData.title);
      course.append("description", formData.description);
      course.append("link", formData.link);
      course.append("thumbnail", formData.thumbnail);
      const response = await main.AdminCourseAdd(course);
      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          title: "",
          description: "",
          link: "",
          thumbnail: null,
        });
        onClose();
        fetchData();
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

  const handleUpdate = async(e) =>{
     e.preventDefault();
    if (loading) return;
    if (!formData.thumbnail) {
      toast.error("Please upload an image before submitting!");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const main = new Listing();
      const course = new FormData();
      course.append("title", formData.title);
      course.append("description", formData.description);
      course.append("link", formData.link);
      if (formData.thumbnail instanceof File) {
        course.append("thumbnail", formData.thumbnail);
      }
      const response = await main.AdminCourseUpdate(data?._id, course);
      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          title: "",
          description: "",
          link: "",
          thumbnail: null,
        });
        onClose();
        fetchData();
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
      link: data?.link || "",
      thumbnail: data?.thumbnail || null,
    });
    if (data?.thumbnail) {
      setPreview(data.thumbnail);
    } else {
      setPreview(null);
    }
  }, [data]);
  // console.log("data", data);
  
  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <form
        onSubmit={data ? handleUpdate : handleAdd}
        className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#55844D]">
          {data ? "Edit Course" : "Add Course"}
        </h2>
        <div>
          <label className="flex justify-between text-[#55844D] font-medium mb-1">
            Title{" "}
            <span className="text-sm text-gray-500">
              ({formData.title.length}/50)
            </span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => {
              if (e.target.value.length <= 50) handleChange(e);
            }}
            placeholder="Enter title"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
            required
          />
        </div>

        {/* Description Field changed to textarea with 300 character limit */}
        <div>
          <label className="flex justify-between text-[#55844D] font-medium mb-1">
            <span>Description</span>
            <span className="text-sm text-gray-500">
              ({formData.description.length}/500)
            </span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => {
              if (e.target.value.length <= 500) 
                handleChange(e);
            }}
            placeholder="Enter description"
            rows={10}
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
            required
          />
        </div>

        <div>
          <label className="block text-[#55844D] font-medium mb-1">
            Course Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Enter course link (e.g. https://example.com)"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
            required
          />
        </div>

        {/* thumbnail Upload Field */}
        <div>
          <label className="block text-[#55844D] font-medium mb-1">
            Upload Course Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-100 rounded-md cursor-pointer text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
          />

          {/* Image Preview */}
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md border"
              />
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          {data ? (
            <button
              type="submit"
              className="cursor-pointer flex-1 bg-[#55844D] text-white py-2 rounded-md hover:bg-[#3d5e37]"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          ) : (
            <button
              type="submit"
              className="cursor-pointer flex-1 bg-[#55844D] text-white py-2 rounded-md hover:bg-[#3d5e37]"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          )}
        </div>
      </form>
    </Popup>
  );
}
