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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white px-4 lg:px-10 pt-5 pb-20  rounded-[40px] shadow-lg w-full max-w-[976px] login_custom">
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
                    <div className='row'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-4">
                            <input
                                value={data?.name}
                                onChange={handleChange}
                                type="text"
                                name='name'
                                placeholder="Name"
                                className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                                required
                            />
                            <input
                                value={data?.email}
                                onChange={handleChange}
                                type="email"
                                name='email'
                                placeholder="Email"
                                className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                                required

                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-4">
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="block w-full  px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-lg lg:rounded-[15px] sm:text-sm"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute top-3 right-5"
                                >
                                    {showNewPassword ? (
                                        <IoEyeOff size={24} className="text-gray-600" />
                                    ) : (
                                        <IoEye size={24} className="text-gray-600" />
                                    )}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showConfirPassword ? "text" : "password"}
                                    id="password"
                                    name="confirm_password"
                                    value={data.confirm_password}
                                    onChange={handleChange}
                                    className="block w-full  px-3 py-3 bg-gray-100 text-[#727272] border border-transparent rounded-lg lg:rounded-[15px] sm:text-sm"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirPassword(!showConfirPassword)}
                                    className="absolute top-3 right-5"
                                >
                                    {showConfirPassword ? (
                                        <IoEyeOff size={24} className="text-gray-600" />
                                    ) : (
                                        <IoEye size={24} className="text-gray-600" />
                                    )}
                                </button>
                            </div>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {/* Time-Zone */}
                            <select className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
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
                            {/* Gender */}
                            <select
                                className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                value={data?.gender || ""}
                                name="gender"
                                required
                            >
                                <option value="">Please select gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>

                            {/* Nationality */}
                            <select className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
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
                            </select>

                        </div>

                        {/* Register Button */}

                        <div className="text-center px-[20px]">
                            <button
                                type="submit"
                                disabled={loading} //
                                className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition"
                            >
                                {loading ? "Loading.." : "Sign Up"} {/* Fixed typo */}
                            </button>
                        </div>
                    </div>

                </form>


                {/* Login Redirect */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/student/login" className="text-red-500 hover:underline">
                        Log in.
                    </Link>
                </p>
            </div>
        </div>
    )
}
