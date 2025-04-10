import Image from 'next/image'
import React, { useState } from 'react'
import Logo from "../../Assets/Images/logo.png"
import Link from 'next/link'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Listing from '@/pages/api/Listing';

export default function index() {
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
        router.push("/student/dashboard")
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt={"Login"} />
        </div>

        {/* Heading */}
        <h2 className="text-center text-red-600 text-2xl font-semibold mb-6">LOG IN</h2>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={data?.email}
              onChange={handleChange}
              type="email"
              name='email'
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showConfirPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
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

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-red-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition"
            type='submit'
            disabled={loading}
          >
            {loading ? "Loading" : "LOG IN"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Not registered?{" "}
          <Link href="/student/register" className="text-red-500 hover:underline">
            Register.
          </Link>
        </p>
      </div>
    </div>
  )
}
