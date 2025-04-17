import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";

export default function Index() {
  const [teachers, setTeachers] = useState([]);
 
  
  const fetchStudentTeachers = async () => {
    try {
      const main = new Listing();
      const response = await main.StudentTeacher();
      console.log("res", response);
      setTeachers(response?.data?.data || []);
    } catch (error) {
      console.log("error", error);
    }
  };
  

  useEffect(() => {
    fetchStudentTeachers();
  }, []);



const handleAddSubmit = async (Id) => {
  try {
    const main = new Listing();
    const response = await main.AddWishlist({ teacherId: Id });
    console.log("res", response);
    fetchStudentTeachers();
  } catch (error) {
    console.log("error", error);
  }
};

const handleRemoveSubmit = async (Id) => {
  console.log(":aa")
  try {
    const main = new Listing();
    const response = await main.RemoveWishlist({ teacherId: Id });
    fetchStudentTeachers();
    console.log("res", response);
  } catch (error) {
    console.log("error", error);
  }
};

console.log("teachers" , teachers)

  return (
    <StudentLayout page={"Find a teacher"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <Link href="/student/favourite-teacher" className="flex w-fit ml-auto mb-4 lg:mb-5 px-2 sm:px-8 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px] tracking-[-0.06em] text-sm font-medium hover:bg-[#CC2828] hover:text-white cursor-pointer">
          View Favourite Teachers
        </Link>
        {/* Lesson Cards */}
        <div className="space-y-4 lg:space-y-5">
          {teachers &&
            teachers?.map((teacher, idx) => (
              <div key={idx}>
                <div className="bg-white rounded-[10px] lesson_list_shadow p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1">
                  <div className="flex items-center space-x-3 mt-2">
                    <Image
                      src={teacher?.teacher?.profile_photo || "/profile.png"}
                      alt="Profile"
                      className="w-20 h-20 lg:w-[104px] lg:h-[104px] rounded-full object-cover"
                      height={104}
                      width={104}
                    />
                    <div>
                      <h3 className="flex font-inter gap-2 items-center text-md lg:text-xl text-[#CC2828] font-medium tracking-[-0.06em] mb-2">
                        {teacher?.userId?.name || ""}
                        {teacher?.isLiked  ? (
                          //Liked teacher
                          <span className="cursor-pointer" onClick={() => handleRemoveSubmit(teacher?.userId?._id)}>
                            <FaHeart color="#CC2828" size={18} />
                          </span>
                        ) : (
                             //Disliked teacher
                          <span 
                            className="cursor-pointer" 
                            onClick={() => handleAddSubmit(teacher?.userId?._id)}
                          >
                            <FaRegHeart color={"#000000"} size={18} />
                           
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-[#7A7A7A] font-inter tracking-[-0.04em] mb-1">
                        {teacher?.description || ""}
                      </p>
                      <p className="text-[#E4B750] text-lg">
                        {teacher.average_price && (
                          ` $${teacher.average_price}/${teacher?.average_duration} min`
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <button className="tracking-[-0.06em] font-inter font-medium px-8 lg:px-12 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px] text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                      Book
                    </button>
                    <Link href={`/student/message?query=${teacher?.userId?._id}`} className="tracking-[-0.06em] font-inter font-medium px-8 lg:px-12 py-2.5 bg-[#CC2828] text-white rounded-[10px]  text-sm hover:bg-white hover:text-[#CC2828] border border-[#CC2828] cursor-pointer">
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
