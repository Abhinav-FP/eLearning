import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";

export default function Earning({ isOpen, onClose, data }) {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState();

    const handleChange = (e) => {
        setAmount(e.target.value);
    };
    const handleAdd = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.payoutAdd({
                amount: parseFloat(amount),
            });
            if (response?.data?.status) {
                toast.success(response.data.message);
                setAmount("");
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
                onSubmit={handleAdd}
                className="max-w-md mx-auto mt-10 px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#CC2828]">
                    Request Payout
                </h2>
                {/* Title Field */}
                <div>
                    <label className="block text-[#CC2828] font-medium mb-1">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        min="0"
                        step="0.01"
                        className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
                        required
                    />

                </div>
                {/* Action Buttons */}
                <div className="flex justify-between gap-4 mt-6">
                    <button
                        type="submit"
                        className="cursor-pointer flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Request Payout"}
                    </button>

                </div>
            </form>
        </Popup>
    );
}
