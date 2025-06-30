import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";

export default function EditReview({ isOpen, onClose, data, getLessons }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        _id: "",
        rating: ""
    });

    useEffect(() => {
        setFormData({
            description: data?.description || "",
            _id: data?._id || "",
            rating: data?.rating || ""
        });
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "rating") {
            let newValue = parseInt(value, 10);
            if (isNaN(newValue)) newValue = ""; // allow empty
            else if (newValue < 1) newValue = 1;
            else if (newValue > 3) newValue = 3;

            setFormData({ ...formData, [name]: newValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.ReviewEdit({
                _id: formData?._id,
                description: formData?.description,
                rating : formData?.rating
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

    return (
        <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
            <form
                onSubmit={handleUpdate}
                className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#CC2828]">
                    Edit Review
                </h2>
                {/* Description Field */}
                <div>
                    <label className="block text-[#CC2828] font-medium mb-1">
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min={1}                     // 👈 Set minimum value
                        max={3}                     // 👈 Set maximum value
                        placeholder="Enter rating (1–3)"
                        className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
                        required
                    />

                </div>

                <div>
                    <label className="block text-[#CC2828] font-medium mb-1">
                        Description
                        <span className="text-sm text-gray-500">({formData.description.length}/300)</span>
                    </label>
                    <textarea
                        rows={10}
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={(e) => {
                            if (e.target.value.length <= 300) handleChange(e);
                        }}
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
                        {loading ? "Updating..." : "Update"}
                    </button>
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
