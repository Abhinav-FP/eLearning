import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import { formatMultiPrice } from "@/components/ValueDataHook";

export default function Earning({ isOpen, onClose, data, dataUsd, fetchEarnings }) {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(dataUsd);

    // const handleChange = (e) => {
    //     setAmount(e.target.value);
    // };
    const handleAdd = async (e) => {
        e.preventDefault();
        if (loading) return;
        if(data === 0){
            toast.error("Cannot create request for 0 amount!");
            return;
        }
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.payoutAdd({
                amount: parseFloat(data),
            });
            if (response?.data?.status) {
                toast.success(response.data.message);
                setAmount("");
                fetchEarnings();
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
                className="max-w-md mx-auto mt-10 px-3 lg:px-6 pb-3 sm:pb-6 bg-white space-y-2 sm:space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#55844D]">
                    Request Payout
                </h2>
                {/* Title Field */}
                <div>
                    <label className="block text-[#55844D] font-medium mb-1">Amount</label>
                    {/* <input
                        type="number"
                        name="amount"
                        value={amount}
                        readOnly
                        placeholder="Enter amount"
                        min="0"
                        step="0.01"
                        className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
                        required
                    /> */}
                    <div
                        className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#55844D] text-base"
                    >
                        {formatMultiPrice(amount, "JPY") ?? "—"}
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-between gap-4 mt-6">
                    <button
                        type="submit"
                        className="cursor-pointer flex-1 bg-[#55844D] text-white py-3 rounded-md hover:bg-[#3d5e37] disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Request Payout"}
                    </button>

                </div>
            </form>
        </Popup>
    );
}
