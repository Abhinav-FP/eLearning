import Image from 'next/image'
import React, { useState } from 'react'
import Logo from "./Assets/Images/logo.png"
import Link from 'next/link'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Listing from '@/pages/api/Listing';

export default function Login () {
  const router = useRouter();
  const [showConfirPassword, setShowConfirPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
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

    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.Login({
        email: data?.email,
        password: data?.password,
      });

      if (response?.data?.status) {
        if(response?.data?.role === "student"){router.push("/student");}
        else if(response?.data?.role === "teacher"){router.push("/teacher-dashboard");}
        toast.success(response.data.message);
        setData({
          email: "",
          password: "",
        });
        localStorage && localStorage.setItem("token", response?.data?.token)
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
      <div className="bg-white px-4 lg:px-10 pt-5 pb-10 lg:pb-20 rounded-[20px] md:rounded-[20px] lg:rounded-[40px] shadow lg:shadow-lg w-full max-w-[653px] login_custom">
        {/* Logo */}
        <div className="flex justify-center mb-6 lg:mb-10">
          <Link href="/"><Image src={Logo} height={75} width={94} alt={"Login"} /></Link>
        </div>

        {/* Heading */}
        <h2 className="text-center text-[#CC2828] text-2xl lg:text-4xl font-bold mb-6 tracking-[-0.04em] mb-6 lg:mb-8">LOG IN</h2>

        <div className='max-w-[421px] mx-auto'>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4 lg:mb-5">
              <label className="block text-base font-medium text-[#727272] tracking-[-0.06em] mb-1">Email</label>
              <input
                value={data?.email}
                onChange={handleChange}
                type="email"
                name='email'
                className="w-full px-4 lg:px-5 py-2 border h-[48px] lg:h-[56px] border-[#F4F6F8] rounded-[6px] lg:rounded-[10px] bg-[#F4F6F8] focus:outline-none focus:ring-1 focus:ring-[#c9c9c9]"
                placeholder="Enter your email"
              />
            </div>
            {/* Password */}
            <div className='mb-6 lg:mb-10'>
              <label className="block text-base font-medium text-[#727272] tracking-[-0.06em] mb-1">Password</label>
              <div className="relative">
                <input
                  type={showConfirPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={data.password}
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
                    <IoEyeOff size={24} className="text-gray-400" />
                  ) : (
                    <IoEye size={24} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-4">
              <a href="#" className="text-base font-medium text-[#CC2828] hover:underline tracking-[-0.06em] ">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button className="w-full cursor-pointer border border-[rgba(0,0,0,0.1)] bg-[#CC2828] hover:bg-red-700 uppercase text-white py-3.5 cursor-pointer rounded-[10px] font-bold text-base transition"
              type='submit'
              disabled={loading}
            >
              {loading ? "Loading" : "LOG IN"}
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-base text-[#727272] mt-6 lg:mt-12 tracking-[-0.03em] font-medium">
            Not registered?{" "}
            <Link href="/student/register" className="text-[#CC2828] hover:underline">
              Register.
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
