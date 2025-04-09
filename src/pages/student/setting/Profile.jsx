import Image from 'next/image';
import React, { useState } from 'react'
import Profile_img from "../../Assets/Images/hero_top_img.png"

export default function Profile() {
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    })
    return (
        <div>
            <div className="border-b border-opacity-10 border-black flex flex-wrap py-6 lg:py-8">
                <div className="w-full sm:w-6/12 lg:w-4/12 sm:pr-3 mb-2 sm:mb-0">
                    <label className="block text-[#1E1E1E] font-semibold text-base mb-1">Your Photo</label>
                    <p className="block text-[#737373] text-[13px]">This will be displayed in your profile</p>
                </div>
                <div className="w-full sm:w-5/12 lg:w-5/12 sm:pl-3">
                    <div className="flex items-center">
                        <div className="relative h-[50px] w-[50px] flex rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-4">
                            <Image
                                className="h-[50px] w-[50px] rounded-full"
                                src={data?.profile_image instanceof File ? URL.createObjectURL(data?.profile_image) : data?.profile_image || Profile_img}
                                alt={data?.name || 'Profile Image'}
                            />

                        </div>
                        <input type="file"
                            //  onChange={handleImageChange} 
                            className="hidden" id="profileImageInput" />
                        <label htmlFor="profileImageInput" className="text-[#0367F7] font-normal text-[13px] border-none tracking-[-0.03em] cursor-pointer">Update Profile</label>
                    </div>
                </div>
            </div>
            <div className="border-b border-opacity-10 border-black py-6 lg:py-8 space-y-4 lg:space-y-6">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#1E1E1E] font-semibold text-base mb-1">Name</label>
                        <p className="block text-[#737373] text-[13px]">Edit your Name</p>
                    </div>
                    <div className="w-full lg:w-5/12 lg:pl-3">
                        <input type="text"
                            className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                            value={data?.name}
                            name='name' onChange={(e) => setData('name', e.target.value)}
                        />

                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#1E1E1E] font-semibold text-base mb-1">Email</label>
                        <p className="block text-[#737373] text-[13px]">Edit your email here</p>
                    </div>
                    <div className="w-full lg:w-5/12 lg:pl-3">
                        <input type="email"
                            value={data?.email}
                            name='email' onChange={(e) => setData('email', e.target.value)}
                            className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                        />

                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                        <label className="block text-[#1E1E1E] font-semibold text-base mb-1">Phone Number</label>
                        <p className="block text-[#737373] text-[13px]">Edit your number here</p>
                    </div>
                    <div className="w-full lg:w-5/12 lg:pl-3">
                        <input type="text"
                            value={data?.phone}
                            name='phone' onChange={(e) => setData('phone', e.target.value)}
                            className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                        />

                    </div>
                </div>
            </div>
            <div className="flex w-full lg:w-10/12 flex-wrap justify-center items-center pt-6 lg:pt-8 space-x-4 lg:space-x-6">
                <button
                    // onClick={handleSubmit}
                    disabled={processing}
                    className="text-white bg-[#0367F7] hover:text-[#0367F7] hover:bg-white text-[17px] font-medium tracking-[-0.04em] h-11 lg:h-[54px] py-2.5 px-12 border border-[#0367F7] rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    )
}
