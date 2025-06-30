import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";
import { TeacherLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchfavouriteStudentTeachers = async (startLoading = true) => {
    try {
      if (startLoading) {
        setLoading(true);
      }
      const main = new Listing();
      const response = await main.StudentfavouriteTeacher();
      setTeachers(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setTeachers([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchfavouriteStudentTeachers();
  }, []);

  const handleRemoveSubmit = async (Id) => {
    try {
      const main = new Listing();
      const response = await main.RemoveWishlist({ teacherId: Id });
      if (response?.data?.status) {
        fetchfavouriteStudentTeachers(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <StudentLayout page={"Favourite teacher"}>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <Link
          href="/student/teachers"
          className="flex w-fit ml-auto mb-4 sm:mb-6 px-6 md:px-8 lg:px-10 py-2 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer"
        >
          Back
        </Link>

        <div className="space-y-4">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx}>
                  <TeacherLoader />
                </div>
              ))}
            </>
          ) : teachers && teachers.length > 0 ? (
            teachers.map((teacher, idx) => {
              const isBlocked = teacher?.teacher?.block === true;

              return (
                <Link
                  href={!isBlocked ? `/teacher/${teacher?._id}` :""}
                  className="block group"
                  key={idx}
                >
                  <div
                    className={`rounded-[10px] lesson_list_shadow p-3 md:p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1 gap-5 
                      ${isBlocked ? "bg-gray-200 opacity-70 pointer-events-none cursor-not-allowed" : "bg-white"}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 md:pl-24 lg:pl-[130px] mt-2 relative min-h-20 lg:min-h-[104px]">
                      <Link href={`/teacher/${teacher?.teacher?._id}`}>
                        <Image
                          src={teacher?.teacher?.profile_photo || "/profile.png"}
                          alt="Profile"
                          className="w-16 h-16 md:w-20 md:h-20 lg:w-[104px] lg:h-[104px] rounded-full object-cover left-0 md:absolute top-0"
                          height={80}
                          width={80}
                        />
                      </Link>
                      <div>
                        <Link href={`/teacher/${teacher?.teacher?._id}`}>
                          <p className="flex gap-2 items-center text-md sm:text-xl text-[#CC2828] font-medium">
                            {teacher?.teacher?.name || ""}
                            <span
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveSubmit(teacher?.teacher?.userId);
                              }}
                            >
                              <FaHeart color={"#CC2828"} size={18} />
                            </span>
                          </p>
                        </Link>

                        {teacher?.teacher?.tags?.length > 0 && (
                          <div className="flex gap-1 items-center">
                            <span className="text-[#8D929A] text-base -tracking-[0.03em] pr-2">
                              Specialities :
                            </span>
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                              {teacher?.teacher?.tags.map((tag, idx) => (
                                <span key={idx} className="flex items-center text-black text-base -tracking-[0.03em] capitalize">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 48 48">
                                    <path fill="#4CAF50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                    <path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414
                                        c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13
                                        c0.781-0.781,0.781-2.047,0-2.828L35,16.172
                                        C34.219,15.391,32.953,15.391,32.172,16.172z" fill="#FFF"/>
                                  </svg>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-x-2 md:gap-x-6 lg:gap-x-8 mb-3 lg:mb-5">
                          <div>
                            <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2">Language :</span>
                            <span className="capitalize text-black text-sm -tracking-[0.03em] ">
                              {teacher?.teacher?.languages_spoken?.join(' , ') || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2">Nationality :</span>
                            <span className="capitalize text-black text-sm -tracking-[0.03em] ">
                              {teacher?.teacher?.userId?.nationality || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2">Gender :</span>
                            <span className="capitalize text-black text-sm -tracking-[0.03em] ">
                              {teacher?.teacher?.gender === 'M' ? 'Male' :
                               teacher?.teacher?.gender === 'F' ? 'Female' : "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#8D929A] text-sm -tracking-[0.03em] pr-2">Experience :</span>
                            <span className="text-black text-sm -tracking-[0.03em] ">
                              {teacher?.teacher?.experience || 'N/A'} Years
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-[#7A7A7A] font-inter tracking-[-0.04em] mb-1 line-clamp-2">
                          {teacher?.teacher?.description || ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          router.push(`/teacher/${teacher?.teacher?._id}?book=true`);
                        }}
                        className="px-6 md:px-10 lg:px-8 xl:px-10 py-2 lg:py-2.5 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                        Book
                      </button>
                      <Link
                        href={`/student/message?query=${teacher?.teacher?.userId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-6 md:px-10 lg:px-8 xl:px-10 py-2 lg:py-2.5 bg-[#CC2828] text-white rounded-md text-xs sm:text-sm hover:bg-white hover:text-[#CC2828] border border-[#CC2828] cursor-pointer"
                      >
                        Message
                      </Link>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <NoData
              Heading="No favourite teacher available"
              content="It looks like you haven't added any favourite teachers yet. Add some to see them here."
            />
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
