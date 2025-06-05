import Listing from '@/pages/api/Listing';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminManage() {
    const [processing, setProcessing] = useState(false)
    const [data, setData] = useState({
        admin_comission: "",
        privcay_policy: "",
        term_contdition: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const HomeLists = async () => {
        try {
            setProcessing(true);
            const main = new Listing();
            const response = await main.HomeList();
            const res = response?.data?.data;
            setData({
                admin_comission: res.admin_comission || "",
                privcay_policy: res.privcay_policy || "",
                term_contdition: res.term_contdition || "",
                _id: res?._id || ""
            });
        } catch (error) {
            console.log('error', error);
            setData([]);
        }
        setProcessing(false);
    };

    useEffect(() => {
        HomeLists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (processing) return;

        setProcessing(true);
        try {
            const main = new Listing();
            const formData = new FormData();
            formData.append("admin_comission", data.admin_comission);
            formData.append("term_contdition", data.term_contdition);
            formData.append("privcay_policy", data.privcay_policy);
            formData.append("_id", data._id);
            const response = await main.HomeUpdate(formData);
            if (response) {
                HomeLists();
                toast.success(response.data.message)
            }
        } catch (error) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message || "Something went wrong.";
            toast.error({
                401: "Unauthorized",
                403: "Access denied.",
                404: message,
                500: "Server error. Please try again later."
            }[status] || message);
        }
        setProcessing(false);
    };


    return (
        <div className=" mx-auto p-6 bg-white ">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                {/* Commission Rate */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Commission Rate (%)</label>
                    <input
                        type="number"
                        name={"admin_comission"}
                        value={data.admin_comission}
                        onChange={handleChange}

                        placeholder="Enter commission rate"
                        className={`w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none
                                `}
                    />
                </div>

                {/* Privacy Policy */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Privacy Policy</label>
                    <textarea
                        rows={6}
                        type="number"
                        name={"privcay_policy"}
                        value={data.privcay_policy}
                        onChange={handleChange}
                        placeholder="Write the privacy policy..."
                        className={`w-full font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none
                                `}
                    />
                </div>

                {/* Terms & Conditions */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Terms & Conditions</label>
                    <textarea
                        rows={6}
                        name={"term_contdition"}
                        value={data.term_contdition}
                        onChange={handleChange}
                        placeholder="Write the terms and conditions..."
                        className={`w-full font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none
                                `}
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        disabled={processing}
                        type="submit"
                        className="w-full max-w-[183px] cursor-pointer border border-[#CC2828] bg-[#CC2828] hover:bg-red-700  text-white py-2.5 lg:py-3.5 cursor-pointer rounded-[10px] font-normal text-base xl:text-xl transition  tracking-[-0.04em]"

                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
