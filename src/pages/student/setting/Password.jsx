import Listing from '@/pages/api/Listing';
import React, { useState } from 'react'
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Password() {
    const [processing, setProcessing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [data, setData] = useState({
        current_password: "",
        new_password: "",
        password_confirmation: "",
    })

    console.log("data", data)
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
            toast.error("Please match password and confirm password");
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
            console.log("response", response)
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
            if (status === 401) {
                toast.error("Unauthorized: Invalid email or password.");
            } else if (status === 403) {
                toast.error("Access denied.");
            } else if (status === 500) {
                toast.error("Server error. Please try again later.");
            } else if (status === 404) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            // toast.error(error?.response?.data?.message || "Something went wrong!");
        }
        setProcessing(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <>
                <div className="border-b border-gray-300 py-6 lg:py-8 space-y-4 lg:space-y-6">
                    {/* Current Password Field */}
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#1E1E1E] font-semibold text-base mb-1">
                                Current Password
                            </label>
                            <p className="block text-[#737373] text-[13px]">
                                Edit your Current Password here
                            </p>
                        </div>
                        <div className="w-full lg:w-5/12 lg:pl-3 relative">
                            <input
                                required

                                type={showCurrentPassword ? "password" : "text"}
                                name="current_password"
                                className={`w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none 
                               `}
                                value={data.current_password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showCurrentPassword ? (
                                    <FaEyeSlash size={24} />
                                ) : (
                                    <FaEye size={24} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* New Password Field */}
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#1E1E1E] font-semibold text-base mb-1">
                                New Password
                            </label>
                            <p className="block text-[#737373] text-[13px]">
                                Edit your New Password here
                            </p>
                        </div>
                        <div className="w-full lg:w-5/12 lg:pl-3 relative">
                            <input
                                required
                                type={showNewPassword ? "password" : "text"}
                                name="new_password"
                                className={`w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D]
                                 text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none 
                                 `}
                                value={data.new_password}
                                onChange={handleChange
                                }
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showNewPassword ? (
                                    <FaEyeSlash size={24} />
                                ) : (
                                    <FaEye size={24} />
                                )}
                            </button>

                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#1E1E1E] font-semibold text-base mb-1">
                                Confirm Password
                            </label>
                            <p className="block text-[#737373] text-[13px]">
                                Edit your Confirm Password here
                            </p>
                        </div>
                        <div className="w-full lg:w-5/12 lg:pl-3 relative">
                            <input
                                type={showConfirmPassword ? "password" : "text"}
                                name="password_confirmation"
                                className={`w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none 
                                `}
                                required
                                value={data.password_confirmation}
                                onChange={handleChange
                                }
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash size={24} />
                                ) : (
                                    <FaEye size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-10/12 flex-wrap justify-center items-center pt-6 lg:pt-8 space-x-4 lg:space-x-6">
                    <button className="w-full cursor-pointer border border-[rgba(0,0,0,0.1)] bg-[#CC2828] hover:bg-red-700 uppercase text-white py-3.5 cursor-pointer rounded-[10px] font-bold text-base transition"
                        type='submit'
                        disabled={processing}
                    >
                        {processing ? "Loading" : "Submit"}
                    </button>
                </div>
            </>
        </form>
    )
}
