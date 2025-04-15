import React from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

export default function Index() {
  const teachers = [
    {
      name: "John Doe",
      description: "Native Japanese speaker with 5 years of experience. ",
      rating: 1,
      teacher: "John Doe",
      isLiked: false,
    },
    {
      name: "John Doe",
      description: "Native Japanese speaker with 5 years of experience. ",
      rating: 3,
      teacher: "John Doe",
      isLiked: true,
    },
    {
      name: "John Doe",
      description: "Native Japanese speaker with 5 years of experience. ",
      rating: 2,
      teacher: "John Doe",
      isLiked: true,
    },
    {
      name: "John Doe",
      description: "Native Japanese speaker with 5 years of experience. ",
      rating: 3,
      teacher: "John Doe",
      isLiked: false,
    },
  ];

  return (
    <StudentLayout page={"Find a teacher"}>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <button className="flex ml-auto mb-4 sm:mb-6 px-2 sm:px-8 py-3 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
          View Favourite Teachers
        </button>
        {/* Lesson Cards */}
        <div className="space-y-4">
          {teachers &&
            teachers?.map((teacher, idx) => (
              <div key={idx}>
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between transition border-red-100 border-1">
                  <div className="flex items-center space-x-3 mt-2">
                    <Image
                      src="/profile.png"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                      height={80}
                      width={80}
                    />
                    <div>
                      <p className="flex gap-2 items-center text-md sm:text-xl text-[#CC2828] font-medium">
                        {teacher?.name || ""}
                        {teacher?.isLiked ? (
                          <span className="cursor-pointer">
                            <FaHeart color={"#CC2828"} size={18} />
                          </span>
                        ) : (
                          <span className="cursor-pointer">
                            <FaRegHeart color={"#7A7A7A"} size={18} />
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {teacher?.description || ""}
                      </p>
                      <p className="text-yellow-500 text-lg">
                        {"★".repeat(teacher?.rating || 0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <button className="px-2 sm:px-10 py-2 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                      Book
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
