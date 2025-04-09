import React, { useState } from 'react'
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Password() {
    const [processing, setProcessing] = useState(false);
    // State to toggle password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [errors, setError] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    })
    const [data, setData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    })


    return (
        <div>
            <div className="border-b border-opacity-10 border-black py-6 lg:py-8 space-y-4 lg:space-y-6">
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
                            type={showCurrentPassword ? "password" : "text"}
                            name="current_password"
                            className={`w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none 
                               `}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
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
                            type={showNewPassword ? "password" : "text"}
                            name="new_password"
                            className={`w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D]
                                 text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none 
                                 `}
                            value={data.new_password}
                            onChange={(e) =>
                                setData("new_password", e.target.value)
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
                            name="new_password_confirmation"
                            className={`w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none 
                                `}
                            value={data.new_password_confirmation}
                            onChange={(e) =>
                                setData(
                                    "new_password_confirmation",
                                    e.target.value
                                )
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
                <button
                    // onClick={handleSubmit}
                    className={`text-white ${processing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#0367F7] hover:text-[#0367F7] hover:bg-white"
                        } text-[17px] font-medium tracking-[-0.04em] h-11 lg:h-[54px] py-2.5 px-12 border border-[#0367F7] rounded-full outline-none focus:outline-none ease-linear transition-all duration-150`}
                    disabled={processing}
                >
                    {processing ? "Processing..." : "Submit"}
                </button>
            </div>
        </div>
    )
}
