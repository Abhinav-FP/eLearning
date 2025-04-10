import Link from 'next/link'
import React, { useState } from 'react'
import timeZones from "../../../Json/TimeZone";
import nationalities from "../../../Json/Nationality";
import Logo from "../../Assets/Images/logo.png"
import Image from 'next/image';

export default function index() {
    const [data, setData] = useState({
        name: "",
        email: "",
        confirmed_email: "",
        timezone: "",
        nationalities: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image src={Logo} alt="Japanse for me" />
                </div>

                {/* Heading */}
                <h2 className="text-center text-red-600 text-2xl font-semibold mb-8">
                    REGISTER
                </h2>

                {/* Form Fields */}
                <form >
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-4">
                        <input
                            value={data?.name}
                            onChange={handleInputChange(data?.name)}
                            type="text"
                            placeholder="Name"
                            className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                        />
                        <input
                            value={data?.email}
                            onChange={handleInputChange(data?.name)}
                            type="email"
                            placeholder="Email"
                            className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                        />
                    </div> */}


                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-4">
                        <input
                            value={data?.confirmed_email}
                            onChange={handleInputChange(data?.confirmed_email)}
                            type="email"
                            placeholder="Confirm email"
                            className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                        />

                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                        {/* Time-Zone */}
                        <select className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100">
                            {timeZones && timeZones?.map((zone, index) => (
                                <option key={index} value={zone.value}>
                                    {zone.label}
                                </option>
                            ))}
                        </select>


                        {/* Gender */}
                        <select className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        {/* Nationality */}
                        <select className="px-4 py-2 border border-gray-200 rounded-md bg-gray-100">
                            {nationalities && nationalities?.map((nation, idx) => (
                                <option key={idx} value={nation.value}>
                                    {nation.label}
                                </option>
                            ))}
                        </select>

                    </div>
                </form>

                {/* Register Button */}
                <button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition">
                    REGISTER
                </button>

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
