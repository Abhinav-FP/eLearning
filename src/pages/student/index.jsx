import React from 'react'
import StudentLayout from './Common/StudentLayout'
import Link from 'next/link'

export default function Index() {
  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-50">
      <h1 className="font-inter text-2xl font-bold text-[#CC2828] mb-1">Welcome Back !</h1>
      <p className="text-base text-[#565F66] mb-6">
        Next Lesson: Monday 10:00 AM with John Doe
      </p>

      {/* Row 1: Upcoming Lessons & Favorite Teachers */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow px-6 pt-6 w-full md:w-[48%] border-red-100 border-1">
          <h2 className="font-inter text-lg font-semibold text-[#CC2828] mb-4">Upcoming Lessons</h2>
          <div className="space-y-2 text-[#565F66] text-xl">
            <p><span className="font-semibold">Date :</span> 14 April</p>
            <p><span className="font-semibold">Day :</span> Monday</p>
            <p><span className="font-semibold">Teacher :</span> John Doe</p>
            <p><span className="font-semibold">Time :</span> 11:00 AM</p>
          </div>
          <button className="mt-4 sm:mt-8 mb-6 sm:mb-0 bg-red-100 text-[#CC2828] px-6 py-2 rounded-full text-xl hover:bg-red-200 transition cursor-pointer">
            Reschedule
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 w-full md:w-[48%] border-red-100 border-1">
          <h2 className="font-inter text-lg font-semibold text-[#CC2828] mb-4">Favorite Teachers</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-red-100 border-1 rounded-xl p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-300" />
                  <div>
                    <p className="font-medium text-sm text-black">John Doe</p>
                    <p className="text-xs text-gray-500">Teacher</p>
                  </div>
                </div>
                <Link href="/student/message" className="text-[#CC2828] text-sm font-medium hover:underline cursor-pointer">
                  Message
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Recent Reviews (left) */}
      <div className="flex flex-wrap gap-6">
        <div className="bg-white rounded-2xl shadow p-6 w-full md:w-[48%] border-red-100 border-1">
          <h2 className="font-inter text-lg font-semibold text-[#CC2828] mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="bg-red-100 p-4 rounded-xl text-sm font-medium"
              >
                <p>
                  "The Courses Are Well-Structured, And The Interactive Lessons Make
                  Learning Engaging. The Support From Teachers Is Excellent!"
                </p>
                <div className="flex items-center mt-2">
                  <div className="text-yellow-500 text-sm">★★★</div>
                </div>
                <p className="mt-1 font-bold text-gray-800">John Doe</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </StudentLayout>
  )
}
