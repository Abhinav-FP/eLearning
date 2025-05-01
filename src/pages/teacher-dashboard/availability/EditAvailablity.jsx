import React, { useEffect, useState } from "react";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import Popup from "@/pages/common/Popup";

export default function EditAvailablity({ isOpen, onClose, TeacherAvailabilitys, selectedEvent }) {
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.EditAvailability(selectedEvent?.id, {
                startDateTime: formData?.startDateTime,
                endDateTime: formData?.endDateTime,
            });
            if (response?.data?.status) {
                toast.success(response.data.message);
                setFormData({
                    title: "",
                    description: "",
                    price: "",
                    duration: "",
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

    useEffect(() => {
        if (selectedEvent?.start && selectedEvent?.end) {
            const formatForInput = (date) => {
                const pad = (n) => n.toString().padStart(2, '0');
                const yyyy = date.getFullYear();
                const MM = pad(date.getMonth() + 1);
                const dd = pad(date.getDate());
                const hh = pad(date.getHours());
                const mm = pad(date.getMinutes());
                return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
            };

            setFormData({
                startDateTime: formatForInput(new Date(selectedEvent.start)),
                endDateTime: formatForInput(new Date(selectedEvent.end)),
            });
        }
    }, [selectedEvent]);

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
            <form
                onSubmit={handleUpdate}
                className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#CC2828]">
                    {"Edit Availablity"}
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
                        value={formData.endDateTime}
                        onChange={handleChange}
                        min={new Date().toISOString().slice(0, 16)}

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
                        {loading ? "Processing..." : "Edit"}
                    </button>
                </div>
            </form>
            <div className="flex justify-between gap-4 mt-6">
                <button
                    type="submit"
                    onClick={handleDelete}
                    disabled={processing}
                    className="cursor-pointer flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                    {processing ? "Processing..." : "Delete"}
                </button>
            </div>
        </Popup>
    );
}
