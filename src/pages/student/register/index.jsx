import Link from 'next/link'
import React, { useState } from 'react'
import timeZones from "../../../Json/TimeZone";
import nationalities from "../../../Json/Nationality";
import Logo from "../../Assets/Images/logo.png"
import Image from 'next/image';
import Listing from '@/pages/api/Listing';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirPassword, setShowConfirPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        timezone: "",
        nationalities: "",
        password: "",
        confirm_password: "",
        gender: "",
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

        if (loading) return;

        if (data?.password !== data?.confirm_password) {
            toast.error("Please match password and confirm password");
            return;
        }
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.Register({
                email: data?.email,
                password: data?.password,
                name: data?.name,
                role: "student",
                nationality: data?.nationalities,
                time_zone: data?.timezone,
                gender: data?.gender,
            });

            if (response?.data?.status) {
                router.push("/student/login")
                toast.success(response.data.message);
                setData({
                    email: "",
                    password: "",
                    confirm_password: "",
                    name: "",
                    role: "",
                    nationalities: "",
                    timezone: "",
                    gender: ""
                });
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white px-6 lg:px-16 pt-5 pb-10 lg:pb-20  rounded-[20px] md:rounded-[20px] lg:rounded-[40px] shadow lg:shadow-lg w-full max-w-[976px] login_custom">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image src={Logo} alt="Japanse for me" />
                </div>

                {/* Heading */}
                <h2 className="text-center text-red-600 text-2xl font-semibold mb-8">
                    REGISTER
                </h2>

                {/* Form Fields */}
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-wrap -mx-2.5 justify-center'>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-medium text-[#727272] tracking-[-0.06em] mb-1">Name</label>
                            <input
                                value={data?.name}
                                onChange={handleChange}
                                type="text"
                                name='name'
                                placeholder="Name"
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                required
                            />
                        </div>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-medium text-[#727272] tracking-[-0.06em] mb-1">Email</label>
                            <input
                                value={data?.email}
                                onChange={handleChange}
                                type="email"
                                name='email'
                                placeholder="Email"
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                required

                            />
                        </div>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-medium text-[#727272] tracking-[-0.06em] mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute top-1/2 cursor-pointer right-4 -translate-y-1/2"
                                >
                                    {showNewPassword ? (
                                        <IoEyeOff size={24} className="text-gray-600" />
                                    ) : (
                                        <IoEye size={24} className="text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className='w-full md:w-6/12 px-2.5 mb-5'>
                            <label className="block text-base font-medium text-[#727272] tracking-[-0.06em] mb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirPassword ? "text" : "password"}
                                    id="password"
                                    name="confirm_password"
                                    value={data.confirm_password}
                                    onChange={handleChange}
                                    className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirPassword(!showConfirPassword)}
                                    className="absolute top-1/2 cursor-pointer right-4 -translate-y-1/2"
                                >
                                    {showConfirPassword ? (
                                        <IoEyeOff size={24} className="text-gray-600" />
                                    ) : (
                                        <IoEye size={24} className="text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className='w-full md:w-4/12 px-2.5 mb-5'>
                            <label className="block text-base font-medium text-[#727272] tracking-[-0.06em] mb-1">Time-Zone</label>
                            {/* Time-Zone */}
                            <select className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
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
                        {/* Gender */}
                        {/* <select
                                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                onChange={handleChange}
                                value={data?.gender || ""}
                                name="gender"
                                required
                            >
                                <option value="">Please select gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select> */}

                        {/* Nationality */}
                        {/* <select className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                                onChange={handleChange}
                                value={data?.nationalities}
                                name='nationalities'
                                required
                            >
                                <option value="">Please select nationality</option>

                                {nationalities && nationalities?.map((nation, idx) => (
                                    <option key={idx} value={nation.value}>
                                        {nation.label}
                                    </option>
                                ))}
                            </select> */}


                        {/* Register Button */}

                        <div className="w-full md:w-12/12 px-2.5 mb-5 flex flex-wrap justify-center">
                            <div className='w-full md:w-6/12'> 
                                <button
                                    type="submit"
                                    disabled={loading} //
                                    className="w-full py-[15px] bg-[#CC2828] hover:bg-[#ad0e0e] cursor-pointer text-white py-2 rounded-md font-semibold transition"
                                >
                                    {loading ? "Loading.." : "Sign Up"} {/* Fixed typo */}
                                </button>
                            </div>
                        </div>


                    </div>

                </form>


                {/* Login Redirect */}
                <p className="text-center text-base text-[#727272] mt-6 lg:mt-12 tracking-[-0.03em] font-medium">
                    Already have an account?{" "}
                    <Link href="/student/login" className="text-[#CC2828] hover:underline">
                        Log in.
                    </Link>
                </p>
            </div>
        </div>
    )
}
