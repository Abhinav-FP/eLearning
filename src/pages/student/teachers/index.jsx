import React, { useEffect, useRef, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";
import { TeacherLoader } from "@/components/Loader";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

export default function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const timerRef = useRef(null);

  const fetchStudentTeachers = async (startLoading = true, search = "") => {
    try {
      if (startLoading) {
        setLoading(true);
      }
      const main = new Listing();
      const response = await main.StudentTeacher(search);
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

  const handleSearchChange = (e) => {
    const sval = e.target.value;
    setSearchText(sval);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!sval || sval.trim() === "") {
      timerRef.current = setTimeout(() => {
        fetchStudentTeachers(true, sval);
      }, 1500);
    } else if (sval.length >= 2) {
      timerRef.current = setTimeout(() => {
        fetchStudentTeachers(true, sval);
      }, 1500);
    }
  };

  return (
    <StudentLayout page={"Find a teacher"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-col md:flex-row justify-between mb-4 lg:mb-5">
          <div className="relative w-full mb-4 md:mb-0 md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#888]" />
            </span>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search using teacher name"
              className="w-full pl-10 pr-4 py-2 border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-1 focus:ring-[#CC2828] placeholder-gray-400"
            />
          </div>
          <Link
            href="/student/favourite-teacher"
            className="w-fit md:ml-auto px-4 lg:px-6 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-md tracking-[-0.06em] text-sm font-medium hover:bg-[#CC2828] hover:text-white cursor-pointer"
          >
            {`View Favourite Teachers (${data?.favouriteSize || "0"})`}
          </Link>
        </div>
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
              <Link href={`/teacher/${teacher?._id}`} className="block group">
                <div
                  key={idx}
                  className="bg-white rounded-[10px] lesson_list_shadow p-3 md:p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1 gap-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 md:pl-24 lg:pl-[130px] mt-2 relative min-h-20 lg:min-h-[104px]">
                    <Image
                      src={teacher?.userId?.profile_photo || "/Placeholder.png"}
                      alt="Profile"
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-[104px] lg:h-[104px] rounded-full object-cover left-0 md:absolute top-0"
                      height={104}
                      width={104}
                    />
                    <div>
                      <h3 className="flex font-inter gap-2 items-center text-md lg:text-xl text-[#CC2828] font-medium tracking-[-0.06em] mb-2 capitalize">
                        {teacher?.userId?.name || ""}
                        {teacher?.isLiked ? (
                          <span
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRemoveSubmit(teacher?.userId?._id);
                            }}
                          >
                            <FaHeart color="#CC2828" className="w-[24px] h-[24px] lg:w-[18px] lg:h-[18px]" size={18} />
                          </span>
                        ) : (
                          <span
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddSubmit(teacher?.userId?._id);
                            }}
                          >
                            <FaRegHeart color={"#000000"} size={18} className="w-[24px] h-[24px] lg:w-[18px] lg:h-[18px]" />
                          </span>
                        )}
                      </h3>

                      {/* Tags */}
                      {teacher?.tags?.length > 0 && (
                        <div className="flex gap-1 md:items-center">
                          <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2  min-w-[100px]">Specialities :</span>
                          <div className="flex flex-wrap gap-x-2 gap-y-0">
                            {teacher.tags.map((tag, idx) => (
                              <span key={idx} className="flex items-center text-black text-base -tracking-[0.03em] capitalize">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 48 48">
                                  <path fill="#4CAF50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                                  <path
                                    d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414
                         c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172
                         C34.219,15.391,32.953,15.391,32.172,16.172z"
                                    fill="#FFF"
                                  />
                                </svg>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Details */}
                      <div className="flex flex-col md:flex-row flex-wrap gap-x-2 md:gap-x-6 lg:gap-x-8 mb-3 lg:mb-5">
                        <div className="flex md:block">
                          <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2 min-w-[102px]">Language :</span>
                          <span className="capitalize text-black text-sm -tracking-[0.03em] flex flex-wrap md:block">{teacher?.languages_spoken.join(' , ') || "N/A"}</span>
                        </div>
                        <div className="flex  md:block">
                          <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2 min-w-[103px]">Nationality :</span>
                          <span className="capitalize text-black text-sm -tracking-[0.03em] flex flex-wrap md:block">{teacher?.userId?.nationality || "N/A"}</span>
                        </div>
                        <div className="flex md:block">
                          <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2 min-w-[104px]">Gender :</span>
                          <span className="capitalize text-black text-sm -tracking-[0.03em] flex flex-wrap md:block ">{teacher?.gender === 'M' ? 'Male' : teacher?.gender === 'F' ? 'Female' : "N/A"}</span>
                        </div>
                        {/* <div>
                          <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2">Experience :</span>
                          <span className="text-black text-sm -tracking-[0.03em] ">{teacher?.experience || 'N/A'} Years</span>
                        </div> */}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#7A7A7A] font-inter tracking-[-0.04em] mb-1 line-clamp-2">
                        {teacher?.description || ""}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons (stop propagation) */}
                  <div className="flex flex-row gap-2 justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering parent click
                        e.preventDefault();  // Prevents default button behavior
                        router.push(`/teacher/${teacher?._id}?book=true`);
                      }}
                      className="tracking-[-0.06em] font-inter font-medium px-6 md:px-10 lg:px-12 py-2 lg:py-2.5 text-[#CC2828] border border-[#CC2828] rounded-md text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer"
                    >
                      Book
                    </button>

                    <Link
                      href={`/student/message?query=${teacher?.userId?._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="tracking-[-0.06em] font-inter font-medium px-6 md:px-10 lg:px-12 py-2 lg:py-2.5 bg-[#CC2828] text-white rounded-md text-sm hover:bg-white hover:text-[#CC2828] border border-[#CC2828] cursor-pointer"
                    >
                      Message
                    </Link>
                  </div>
                </div>
              </Link>

            ))
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
