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
import NoData from "@/pages/common/NoData";
import VideoModalDetail from "@/pages/common/VideoModalDetail";

export default function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);
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
      if(wishlistLoading){
        return;
      }
      setWishlistLoading(true);
      const main = new Listing();
      const response = await main.AddWishlist({ teacherId: Id });
      fetchStudentTeachers(false);
      setWishlistLoading(false);
    } catch (error) {
      console.log("error", error);
      setWishlistLoading(false);
    }
  };

  const handleRemoveSubmit = async (Id) => {
    try {
      if(wishlistLoading){
        return;
      }
      setWishlistLoading(true);
      const main = new Listing();
      const response = await main.RemoveWishlist({ teacherId: Id });
      fetchStudentTeachers(false);
      setWishlistLoading(false);
    } catch (error) {
      console.log("error", error);
      setWishlistLoading(false);
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
              className="w-full pl-10 pr-4 py-2 border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D] placeholder-gray-400"
            />
          </div>
          <Link
            href="/student/favourite-teacher"
            className="w-fit md:ml-auto px-4 lg:px-6 py-2.5 text-[#55844D] border border-[#55844D] rounded-md tracking-[-0.06em] text-sm font-medium hover:bg-[#55844D] hover:text-white cursor-pointer"
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
          ) : data && data?.teacher && data?.teacher?.length === 0 ? (
            // <div className="text-center text-gray-500 py-8 text-lg">No teachers found.</div>
            <NoData
              Heading={"No Teachers Found"}
              content={
                "Oops looks like there is no teacher matching your search at this moment."
              }
            />
          ) : (
            data &&
            data?.teacher &&
            data?.teacher?.map((teacher, idx) => (
              <Link href={`/teacher/${teacher?._id}`} className="block group">
                <div
                  key={idx}
                  className="bg-white rounded-[10px] lesson_list_shadow p-4 lg:p-6 flex flex-col lg:flex-row gap-6 lg:gap-10 border border-[#55844D]/20"
                >
                  {/* {teacher?.intro_video && ( */}
                    <div className="w-full sm:max-w-[300px] shrink-0" 
                      onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault();
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <VideoModalDetail
                        video={teacher?.intro_video}
                        image={
                          teacher?.userId?.profile_photo || "/Placeholder.png"
                        }
                        name={teacher?.userId?.name}
                        divClass="relative"
                        imgClass="rounded-[10px] h-[160px] sm:h-[200px] w-full object-cover"
                        btnClass="absolute inset-0 flex justify-center items-center text-white hover:text-[#55844D]"
                      />
                    </div>
                  {/* )} */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3
                        className="flex gap-2 items-center font-inter text-lg lg:text-2xl
                       text-[#55844D] font-semibold capitalize mb-2"
                      >
                        {teacher?.userId?.name}
                      {teacher?.isLiked ? (
                          <span
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRemoveSubmit(teacher?.userId?._id);
                            }}
                          >
                            <FaHeart color="#55844D" className="w-[24px] h-[24px] lg:w-[18px] lg:h-[18px]" size={18} />
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
                        <div className="flex gap-2 items-start mb-3">
                          <span className="text-[#8D929A] text-base min-w-[90px]">
                            Specialities:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {teacher && teacher?.tags && teacher?.tags?.map((tag, i) => (
                              <span
                                key={i}
                                className="flex items-center text-black text-base -tracking-[0.03em] capitalize"
                              >
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

                      {/* Language / Nationality / Gender */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 mb-4">
                        <p className="text-base capitalize text-black -tracking-[0.03em]">
                          <span className="text-[#8D929A] mr-1">Language:</span>
                          {teacher && teacher?.languages && teacher?.languages_spoken?.join(", ") || "N/A"}
                        </p>
                        <p className="text-base capitalize text-black -tracking-[0.03em]">
                          <span className="text-[#8D929A] mr-1">
                            Nationality:
                          </span>
                          {teacher?.userId?.nationality || "N/A"}
                        </p>
                        <p className="text-base capitalize text-black -tracking-[0.03em]">
                          <span className="text-[#8D929A] mr-1">Gender:</span>
                          {teacher?.gender === "M" ? "Male" : "Female"}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#7A7A7A] line-clamp-2">
                        {teacher?.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/teacher/${teacher?._id}?book=true`);
                        }}
                        className="font-medium cursor-pointer rounded-full py-2 px-5 bg-[#55844D] hover:bg-[#3d5e37] text-white text-sm lg:text-base transition-all"
                      >
                        Book
                      </button>

                      <Link
                        href={`/student/message?query=${teacher?.userId?._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-medium cursor-pointer rounded-full py-2 px-5 bg-[#55844D] hover:bg-[#3d5e37] text-white text-sm lg:text-base transition-all"
                      >
                        Message
                      </Link>
                    </div>
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
