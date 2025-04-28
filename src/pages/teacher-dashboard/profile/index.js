import React from "react";
import TeacherLayout from "../Common/TeacherLayout";
import { MdEditSquare } from "react-icons/md";

const LessonCard = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl flex justify-between items-center p-4 mb-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-red-700">Trial Lesson</h3>
          <MdEditSquare size={16} className="text-red-500 cursor-pointer" />
        </div>
        <div className="flex items-center text-yellow-400 text-sm mt-1">
          ★★★★☆ (29)
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Introduction & Goal Setting, Brief Language Assessment, Personalized
          Feedback & Next Steps
        </p>
      </div>
      <div className="text-right">
        <div className="bg-red-100 text-red-600 font-bold p-2 rounded-full">
          USD $20.00
        </div>
      </div>
    </div>
  );
};

export default function Index() {
  return (
    <TeacherLayout page={"Profile"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <h1 className="font-inter text-lg lg:text-2xl xl:text-3xl font-bold text-[#CC2828] mb-6">Edit Profile</h1>
        <div className="bg-red-100 p-6 rounded-2xl flex flex-col justify-between items-start relative">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold text-[#CC2828]">James Smith</h2>
              <p className="text-[#46494D] text-sm">Teacher</p>
            </div>
          </div>

          {/* Edit Button */}
          <button className="absolute top-[67px] sm:top-10 right-1 sm:right-4 bg-[#CC2828] hover:bg-[#941111fd] text-white text-sm px-4 py-1.5 rounded cursor-pointer">
            Edit Profile
          </button>

          {/* Info Grid */}
          <div className="w-full mt-10 mb-2 flex flex-wrap gap-x-10 gap-y-2 md:justify-center text-sm">
            <p>
              <span className="font-semibold text-red-500">Nationality:</span>{" "}
              Japanese
            </p>
            <p>
              <span className="font-semibold text-red-500">Gender:</span> Male
            </p>
            <p>
              <span className="font-semibold text-red-500">
                Language spoken:
              </span>{" "}
              Japanese, English
            </p>
            <p>
              <span className="font-semibold text-red-500">Interests:</span>{" "}
              Writing / Blogging
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-red-700 mb-4">Lessons</h2>
          <div className="space-y-4">
            <LessonCard />
            <LessonCard />
            <LessonCard />
          </div>

          {/* <div className=" mt-6"> */}
            <button className="bg-[#CC2828] hover:bg-red-600 mt-6 text-white px-6 py-2 rounded font-bold">
              Add Lesson
            </button>
          {/* </div> */}
        </section>
      </div>
    </TeacherLayout>
  );
}
