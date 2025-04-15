import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Profile_img from "../../Assets/Images/hero_top_img.png"
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';

export default function Profile() {

    useEffect(() => {
        const main = new Listing();
        main.profileVerify()
          .then((r) => {
            console.log("r" ,r)
            const profiledata = r?.data?.data?.user;
            setData({
              name: profiledata?.name,
              email: profiledata?.email,
              phone: profiledata?.phone,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
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
        if (processing) return;

        setProcessing(true);
        try {
            const main = new Listing();
            const response = await main.ProfileUpdate({
                name: data?.name,
                email: data?.email,
                phone: data?.phone
            });
            if (response?.data) {
                toast.success(response.data.message);
                setData({
                    phone: "",
                    name: "",
                    email: "",
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
            <>
                <div className="border-b border-gray-300 flex flex-wrap py-6 lg:py-8">
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
                                required
                                name='name'
                                onChange={handleChange}
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
                                required
                                name='email'
                                onChange={handleChange}
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
                                required
                                name='phone'
                                onChange={handleChange}
                                className="w-full h-11 lg:h-[54px] font-semibold appearance-none block bg-white text-[#46494D] text-base border border-gray-300 rounded-lg py-3 px-3 lg:px-5 leading-tight focus:outline-none"
                            />

                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-10/12 flex-wrap justify-center items-center pt-6 lg:pt-8 space-x-4 lg:space-x-6">
                    <button className="w-full cursor-pointer border border-[rgba(0,0,0,0.1)] bg-[#CC2828] hover:bg-red-700 uppercase text-white py-3.5 cursor-pointer rounded-[10px] font-bold text-base transition"
                        type='submit'
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? "Loading" : "Submit"}
                    </button>
                </div>
            </>
    )
}
