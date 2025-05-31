import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";
import { TeacherLoader } from "@/components/Loader";
import { formatMultiPrice } from "@/components/ValueDataHook";

export default function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudentTeachers = async (startLoading=true) => {
    try {
      if(startLoading){
        setLoading(true);
      }
      const main = new Listing();
      const response = await main.StudentTeacher();
      setData(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentTeachers();
  }, []);

  const handleAddSubmit = async (Id) => {
    try {
      const main = new Listing();
      const response = await main.AddWishlist({ teacherId: Id });
      fetchStudentTeachers(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveSubmit = async (Id) => {
    try {
      const main = new Listing();
      const response = await main.RemoveWishlist({ teacherId: Id });
      fetchStudentTeachers(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  // console.log("data",data);

  return (
    <StudentLayout page={"Find a teacher"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <Link
          href="/student/favourite-teacher"
          className="flex w-fit ml-auto mb-4 lg:mb-5 px-2 sm:px-8 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px] tracking-[-0.06em] text-sm font-medium hover:bg-[#CC2828] hover:text-white cursor-pointer"
        >
          {`View Favourite Teachers (${data?.favouriteSize || "0"})`}
        </Link>
        {/* Lesson Cards */}
        <div className="space-y-4 lg:space-y-5">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx}>
                  <TeacherLoader />
                </div>
              ))}
            </>
          ) : (
            data &&
            data?.teacher &&
            data?.teacher?.map((teacher, idx) => (
              <div key={idx}>
                <div className="bg-white rounded-[10px] lesson_list_shadow  p-3 md:p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1 gap-5">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 md:pl-24 lg:pl-[130px] mt-2 relative min-h-20 lg:min-h-[104px]">
                    <Image
                      src={teacher?.userId?.profile_photo || "/profile.png"}
                      alt="Profile"
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-[104px] lg:h-[104px] rounded-full object-cover left-0 md:absolute top-0"
                      height={104}
                      width={104}
                    />
                    <div>
                      <h3 className="flex font-inter gap-2 items-center text-md lg:text-xl text-[#CC2828] font-medium tracking-[-0.06em] mb-2">
                        <Link href={`/teacher/${teacher?._id}`}>
                          {teacher?.userId?.name || ""}
                        </Link>
                        {teacher?.isLiked ? (
                          //Liked teacher
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              handleRemoveSubmit(teacher?.userId?._id)
                            }
                          >
                            <FaHeart color="#CC2828" size={18} />
                          </span>
                        ) : (
                          //Disliked teacher
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              handleAddSubmit(teacher?.userId?._id)
                            }
                          >
                            <FaRegHeart color={"#000000"} size={18} />
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-[#7A7A7A] font-inter tracking-[-0.04em] mb-1 line-clamp-2">
                        {teacher?.description || ""}
                      </p>
                      <p className="text-[#E4B750] text-base lg:text-lg font-inter">
                        {teacher.average_price && teacher?.average_duration &&
                          ` ${formatMultiPrice(teacher.average_price, "USD")}/${teacher?.average_duration} min`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <Link
                      href={`/teacher/${teacher?._id}`}
                      className="tracking-[-0.06em] font-inter font-medium px-6 md:px-10 lg:px-12 py-2 lg:py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px] text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer"
                    >
                      Book
                    </Link>
                    <Link
                      href={`/student/message?query=${teacher?.userId?._id}`}
                      className="tracking-[-0.06em] font-inter font-medium px-6 md:px-10 lg:px-12 py-2 lg:py-2.5 bg-[#CC2828] text-white rounded-[10px]  text-sm hover:bg-white hover:text-[#CC2828] border border-[#CC2828] cursor-pointer"
                    >
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
