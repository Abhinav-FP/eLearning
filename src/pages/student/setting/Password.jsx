import Listing from '@/pages/api/Listing';
import React, { useState } from 'react'
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Password() {
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        current_password: "",
        new_password: "",
        password_confirmation: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data?.new_password !== data?.password_confirmation) {
            toast.error("The password and confirm password do not match.");
            return;
        }
        if (processing) return;

        setProcessing(true);
        try {
            const main = new Listing();
            const response = await main.ResetPassword({
                existingPassword: data?.current_password,
                newPassword: data?.password_confirmation,
            });
            if (response?.data) {
                toast.success(response.data.message);
                setData({
                    password_confirmation: "",
                    new_password: "",
                    current_password: "",
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("API error:", error);
            const status = error?.response?.status;
            // if (status === 401) {
            //     toast.error("Unauthorized: Invalid email or password.");
            // } else if (status === 403) {
            //     toast.error("Access denied.");
            // } else if (status === 500) {
            //     toast.error("Server error. Please try again later.");
            // } else if (status === 404) {
            //     toast.error(error?.response?.data?.message);
            // } else {
            //     toast.error("Something went wrong. Please try again.");
            // }
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }
        setProcessing(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <>
                <div className="border-b border-[rgba(0,0,0,.1)]  py-6 lg:py-8 space-y-4 lg:space-y-6">
                    {/* Current Password Field */}
                    <div className="flex flex-wrap items-start">
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#55844D] font-medium text-base lg:text-xl mb-1 tracking-[-0.04em]">
                                Current Password
                            </label>
                            <p className="block text-[#535353] font-medium text-base tracking-[-0.04em] mb-0">
                                Enter  your Current Password here
                            </p>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                            <input
                                required
                                type="password"
                                name="current_password"
                                className={`w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none 
                               `}
                                value={data.current_password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* New Password Field */}
                    <div className="flex flex-wrap items-start">
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#55844D] font-medium text-base lg:text-xl mb-1 tracking-[-0.04em]">
                                New Password
                            </label>
                            <p className="block text-[#535353] font-medium text-base tracking-[-0.04em] mb-0">
                                Enter  your New Password here
                            </p>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                            <input
                                required
                                type="password"
                                name="new_password"
                                className={`w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none 
                                 `}
                                value={data.new_password}
                                onChange={handleChange
                                }
                            />
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-wrap items-start">
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#55844D] font-medium text-base lg:text-xl mb-1 tracking-[-0.04em]">
                                Confirm Password
                            </label>
                            <p className="block text-[#535353] font-medium text-base tracking-[-0.04em] mb-0">
                                Enter  your Confirm Password here
                            </p>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3 relative">
                            <input
                                type="password"
                                name="password_confirmation"
                                className={`w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none
                                `}
                                required
                                value={data.password_confirmation}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-12/12 xl:w-11/12 flex-wrap justify-center items-center pt-6 lg:pt-10 space-x-4 lg:space-x-6">
                    <button
                        className="w-full max-w-[183px] cursor-pointer border border-[#55844D] bg-[#55844D] hover:bg-green-700  text-white py-2.5 lg:py-3.5 cursor-pointer rounded-[10px] font-normal text-base xl:text-xl transition  tracking-[-0.04em]"
                        type='submit'
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </>
        </form>
    )
}
