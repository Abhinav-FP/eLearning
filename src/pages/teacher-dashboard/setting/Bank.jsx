import Listing from '@/pages/api/Listing';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";

export default function Bank() {
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const main = new Listing();
        main.teacherbankget()
            .then((r) => {
                console.log("r", r)
                const profiledata = r?.data?.data;
                console.log("profileData", profiledata);
                setData({
                    BankName: profiledata?.BankName,
                    BankNumber: profiledata?.BankNumber,
                    BranchName: profiledata?.BranchName,
                    IFSC: profiledata?.IFSC,
                    _id: profiledata?._id,
                    AccountHolderName: profiledata?.AccountHolderName

                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [data, setData] = useState({
        BankName: "",
        BankNumber: "",
        BranchName: "",
        IFSC: "",
        AccountHolderName: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (processing) return;

        setProcessing(true);
        try {
            const main = new Listing();
            const response = await main.TeacherBank(data);
            if (response?.data) {
                toast.success(response.data.message || "Bank details updated successfully.");
            } else {
                toast.error(response?.data?.message || "Failed to update.");
            }
        } catch (error) {
            console.error("API error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6 py-6">
                {/* Branch Name */}
                <div className="flex flex-wrap items-start">
                    <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#CC2828] font-medium text-base lg:text-xl mb-1">Account Holder Name</label>
                        <p className="text-[#535353] text-base">Enter your Account Holder Name here</p>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                        <input
                            required
                            type="text"
                            name="AccountHolderName"
                            className="w-full h-11 lg:h-[54px] font-medium bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-6"
                            value={data.AccountHolderName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* Bank Name */}
                <div className="flex flex-wrap items-start">
                    <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#CC2828] font-medium text-base lg:text-xl mb-1">Bank Name</label>
                        <p className="text-[#535353] text-base">Enter your Bank Name here</p>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                        <input
                            required
                            type="text"
                            name="BankName"
                            className="w-full h-11 lg:h-[54px] font-medium bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-6"
                            value={data.BankName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Bank Number */}
                <div className="flex flex-wrap items-start">
                    <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#CC2828] font-medium text-base lg:text-xl mb-1">Bank Account Number</label>
                        <p className="text-[#535353] text-base">Enter your Bank Account Number here</p>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                        <input
                            required
                            type="text"
                            name="BankNumber"
                            className="w-full h-11 lg:h-[54px] font-medium bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-6"
                            value={data.BankNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Branch Name */}
                <div className="flex flex-wrap items-start">
                    <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#CC2828] font-medium text-base lg:text-xl mb-1">Branch Name</label>
                        <p className="text-[#535353] text-base">Enter your Branch Name here</p>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                        <input
                            required
                            type="text"
                            name="BranchName"
                            className="w-full h-11 lg:h-[54px] font-medium bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-6"
                            value={data.BranchName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* IFSC Code */}
                <div className="flex flex-wrap items-start">
                    <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#CC2828] font-medium text-base lg:text-xl mb-1">IFSC Code</label>
                        <p className="text-[#535353] text-base">Enter your Bank IFSC Code here</p>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                        <input
                            required
                            type="text"
                            name="IFSC"
                            className="w-full h-11 lg:h-[54px] font-medium bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-6"
                            value={data.IFSC}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
                <button
                    type="submit"
                    className="w-full max-w-[183px] bg-[#CC2828] hover:bg-red-700 text-white py-2.5 rounded-[10px] text-base xl:text-xl"
                    disabled={processing}
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
}
