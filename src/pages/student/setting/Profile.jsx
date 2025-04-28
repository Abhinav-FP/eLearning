import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Profile_img from "../../Assets/Images/hero_top_img.png"
import timeZones from "../../../Json/TimeZone";
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';

export default function Profile() {
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        timezone: "",
    })
    
    useEffect(() => {
        const main = new Listing();
        main.profileVerify()
          .then((r) => {
            const profiledata = r?.data?.data?.user;
            // console.log("profileData",profiledata);
            setData({
              name: profiledata?.name,
              email: profiledata?.email,
              timezone: profiledata?.time_zone,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

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
        if(data?.phone?.length <10){
            toast.error("Phone Number must be 10 digits long");
            return;
        }
        setProcessing(true);
        try {
            const main = new Listing();
            const response = await main.ProfileUpdate({
                name: data?.name,
                email: data?.email,
                time_zone: data?.timezone
            });
            if (response?.data) {
                toast.success(response.data.message);
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
                <div className="border-b  border-[rgba(0,0,0,.1)] flex flex-wrap py-6 lg:py-8">
                    <div className="w-full w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 sm:mb-0">
                        <label className="block text-[#CC2828] tracking-[-0.04em] font-medium text-base xl:text-xl mb-1">Your Photo</label>
                        <p className="block text-[#535353] text-sm xl:text-base tracking-[-0.04em] font-medium">This will be displayed in your profile</p>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
                        <div className="flex items-center">
                            <div className="relative h-[52px] w-[52px] flex rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-4">
                                <Image
                                    className="h-[52px] w-[52px] rounded-full"
                                    src={data?.profile_image instanceof File ? URL.createObjectURL(data?.profile_image) : data?.profile_image || Profile_img}
                                    alt={data?.name || 'Profile Image'}
                                />

                            </div>
                            <input type="file"
                                //  onChange={handleImageChange} 
                                className="hidden" id="profileImageInput" />
                            <label htmlFor="profileImageInput" className="text-[#CC2828] font-medium text-base xl:text-xl border-none tracking-[-0.04em] cursor-pointer">Update Profile</label>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[rgba(0,0,0,.1)]  py-6 lg:py-8 space-y-4 lg:space-y-6">
                    <div className="flex flex-wrap">
                        <div className="w-full w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">Name</label>
                            <p className="block text-[#535353] font-medium text-sm xl:text-base  tracking-[-0.04em] mb-0">Edit your Name</p>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
                            <input type="text"
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                                value={data?.name}
                                required
                                name='name'
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">Email</label>
                            <p className="block text-[#535353] font-medium text-sm xl:text-base tracking-[-0.04em] mb-0">Edit your email here</p>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
                            <input type="email"
                                value={data?.email}
                                required
                                name='email'
                                onChange={handleChange}
                                className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                            />

                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-5/12 xl:w-4/12 lg:pr-3 mb-2 lg:mb-0">
                            <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">Time Zone</label>
                            <p className="block text-[#535353] font-medium text-sm xl:text-base tracking-[-0.04em] mb-0">Edit your time zone here</p>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
                            <select className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none  tracking-[-0.04em]"
                                onChange={handleChange}
                                value={data?.timezone}
                                name='timezone'
                                required

                            >
                                <option value="">Please select Time-Zone</option>
                                {timeZones && timeZones?.map((zone, index) => (
                                    <option key={index} value={zone.value}>
                                        {zone.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-12/12 xl:w-11/12 flex-wrap justify-center items-center pt-6 lg:pt-10 space-x-4 lg:space-x-6">
                    <button className="w-full max-w-[183px] cursor-pointer border border-[#CC2828] bg-[#CC2828] hover:bg-red-700  text-white py-3.5 cursor-pointer rounded-[10px] font-normal text-base xl:text-xl transition  tracking-[-0.04em]" 
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
