import Image from 'next/image'
import React from 'react'
import Logo from "../../Assets/Images/logo.png"
import Link from 'next/link'
export default function index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm">
      {/* Logo */}
      <div className="flex justify-center mb-6">
       <Image src={Logo} alt={"Login"}/>
      </div>

      {/* Heading */}
      <h2 className="text-center text-red-600 text-2xl font-semibold mb-6">LOG IN</h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Password */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your password"
        />
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end mb-6">
        <a href="#" className="text-sm text-red-500 hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Login Button */}
      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition">
        LOG IN
      </button>

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
