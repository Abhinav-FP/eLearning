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
      <div className="min-h-screen  py-5 lg:py-[30px]">
        <div className="px-5 lg:px-[30px]">
          <h1 className="font-inter text-lg md:text-xl lg:text-3xl font-bold text-[#CC2828] tracking-[-0.04em] mb-4 lg:mb-5">
            Stay on Track with Your Lessons
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex px-5 lg:px-[30px] flex-wrap gap-6 sm:gap-12 md:gap-28 border-b border-[rgba(0,0,0,0.2)] mb-6">
          {["Upcoming", "Past", "Cancelled"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item.toLowerCase())}
              className={`py-3 font-inter px-2 rounded-b rounded-b-sm text-sm lg:text-base font-medium tracking-[-0.04em] cursor-pointer relative after:absolute after:left-0 after:right-0 after:h-[5px] after:bottom-0 after:rounded-md ${tab === item.toLowerCase()
                  ? "text-[#CC2828] after:bg-[#CC2828]"
                  : "text-[#535353]  hover:text-[#CC2828] hover:after:bg-[#CC2828]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Lesson Cards */}
        <div className="space-y-4 lg:space-y-5  px-5 lg:px-[30px]">
          {lessons &&
            lessons?.map((lesson, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 lg:gap-4 flex-wrap mb-3 lg:mb-5">
                  <p className="text-[#CC2828] font-bold text-lg lg:text-xl font-inter">
                    {lesson.date}
                  </p>
                  <p className="text-sm lg:text-base font-medium text-[#535353] font-inter ">{lesson?.time || ""}</p>
                  <p className="text-sm lg:text-base font-medium text-[#535353] font-inter ">{lesson?.duration || ""}</p>
                </div>
                <div
                  className="bg-white rounded-[10px] lesson_list_shadow p-4 lg:p-5 flex items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1"
                >
                  <div className="flex items-center space-x-2.5 lg:space-x-3">
                    <Image
                      src="/profile.png"
                      alt="Profile"
                      className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover"
                      height={44}
                      width={44}
                    />
                    <div>
                      <p className="text-sm font-inter font-medium text-black tracking-[-0.06em]">
                        {lesson?.teacher || ""}
                      </p>
                      <p className="text-xs font-inter text-[#7A7A7A] tracking-[-0.04em]">Teacher</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-5">
                    <button className="tracking-[-0.06em] font-inter px-8 md:px-16 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px]  text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                      Reschedule
                    </button>
                    <button className="tracking-[-0.06em] font-inter px-8 md:px-16 py-2.5 text-white border border-[#CC2828] rounded-[10px]  text-sm bg-[#CC2828] hover:bg-white hover:text-[#CC2828] cursor-pointer">
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
