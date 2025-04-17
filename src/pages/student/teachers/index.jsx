import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";

export default function Index() {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const main = new Listing();
    const response = main.StudentTeacher();
    response.then((res) => {
      console.log("res", res)
      setTeachers(res?.data?.data || [])
    }).catch((error) => {
      console.log("erorr", error)
    })
  }, [])

const handlesubmit =  async()=>{
  const main = new Listing();
  const response = main.StudentTeacher();
  response.then((res)=>{
    console.log("res", res)
  }).catch((error)=>{
    console.log("error" ,error)
  })
}

  return (
    <StudentLayout page={"Find a teacher"}>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <Link href="/student/favourite-teacher" className="flex w-fit ml-auto mb-4 sm:mb-6 px-2 sm:px-8 py-3 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
          View Favourite Teachers
        </Link>
        {/* Lesson Cards */}
        <div className="space-y-4">
          {teachers &&
            teachers?.map((teacher, idx) => (
              <div key={idx}>
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between transition border-red-100 border-1">
                  <div className="flex items-center space-x-3 mt-2">
                    <Image
                      src={teacher?.teacher?.profile_photo || "/profile.png"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                      height={80}
                      width={80}
                    />
                    <div>
                      <p className="flex gap-2 items-center text-md sm:text-xl text-[#CC2828] font-medium">
                        {teacher?.userId?.name || ""}
                        {teacher?.isLiked ? (
                          <span className="cursor-pointer" onClick={()=>{handlesubmit()}}>
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
                        {teacher.average_price && (
                          ` $${teacher.average_price}/${teacher?.average_duration} min`
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <button className="px-2 sm:px-10 py-2 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                      Book
                    </button>
                    <Link href="/student/message" className="px-2 sm:px-10 py-2 bg-[#CC2828] text-white rounded-md text-xs sm:text-sm hover:bg-white hover:text-[#CC2828] border border-[#CC2828] cursor-pointer">
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </StudentLayout>
  );
}
