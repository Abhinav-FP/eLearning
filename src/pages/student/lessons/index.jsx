import React, { useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";

export default function Index() {
  const [tab, setTab] = useState("upcoming");
  const lessons = Array(6).fill({
    date: "April 15, 2025",
    time: "2:00 PM",
    duration: "1 Hour",
    teacher: "John Doe",
  });

  return (
    <StudentLayout page={"My Lessons"}>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-inter font-bold text-[#CC2828] mb-4">
        Stay on Track with Your Lessons
      </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 sm:gap-12 md:gap-24 border-b border-gray-300 mb-6">
          {["Upcoming", "Past", "Cancelled"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item.toLowerCase())}
              className={`pb-2 text-sm font-medium cursor-pointer ${
                tab === item.toLowerCase()
                  ? "text-[#CC2828] border-b-2 border-[#CC2828]"
                  : "text-gray-500 hover:text-[#CC2828]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Lesson Cards */}
        <div className="space-y-4">
          {lessons &&
            lessons?.map((lesson, idx) => (
              <div key={idx}>
              <div className="flex gap-4 mb-2">
              <p className="text-[#CC2828] font-semibold">
                {lesson.date}
              </p>
              <p className="text-sm text-gray-600">{lesson?.time || ""}</p>
              <p className="text-sm text-gray-600">{lesson?.duration || ""}</p>
            </div>
              <div
                className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between transition border-red-100 border-1"
              >
                  <div className="flex items-center space-x-3 mt-2">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                    height={40}
                    width={40}
                  />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {lesson?.teacher || ""}
                      </p>
                      <p className="text-xs text-gray-500">Teacher</p>
                    </div>
                  </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="px-2 sm:px-10 py-2 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                    Reschedule
                  </button>
                  <button className="px-2 sm:px-10 py-2 bg-[#CC2828] text-white rounded-md text-xs sm:text-sm hover:bg-white hover:text-[#CC2828] border border-[#CC2828] cursor-pointer">
                    Message
                  </button>
                </div>
              </div>
              </div>
            ))}
        </div>
      </div>
    </StudentLayout>
  );
}
