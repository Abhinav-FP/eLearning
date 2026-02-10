import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";
import { TeacherLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { useRouter } from "next/router";
import VideoModalDetail from "@/pages/common/VideoModalDetail";

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
          className="flex w-fit ml-auto mb-4 sm:mb-6 px-6 md:px-8 lg:px-10 py-2 text-[#55844D] border border-[#55844D] rounded-md text-xs sm:text-sm hover:bg-[#55844D] hover:text-white cursor-pointer"
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
                <Link href={!isBlocked ? `/teacher/${teacher?.teacher?._id}` :""} className="block group">
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
                        video={teacher?.teacher?.intro_video}
                        image={teacher?.teacher?.profile_photo || "/Placeholder.png"}
                        name={teacher?.teacher?.name}
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
                        {teacher?.teacher?.name || ""}
                      <span
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveSubmit(teacher?.teacher?.userId);
                              }}
                            >
                              <FaHeart color={"#55844D"} size={18} />
                            </span>
                      </h3>

                      {/* Tags */}
                      {teacher?.teacher?.tags?.length > 0 > 0 && (
                        <div className="flex gap-2 items-start mb-3">
                          <span className="text-[#8D929A] text-base min-w-[90px]">
                            Specialities:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {teacher?.teacher?.tags.map((tag, i) => (
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
                          {teacher?.teacher?.languages_spoken?.join(' , ') || "N/A"}
                        </p>
                        <p className="text-base capitalize text-black -tracking-[0.03em]">
                          <span className="text-[#8D929A] mr-1">
                            Nationality:
                          </span>
                          {teacher?.teacher?.userId?.nationality || "N/A"}
                        </p>
                        <p className="text-base capitalize text-black -tracking-[0.03em]">
                          <span className="text-[#8D929A] mr-1">Gender:</span>
                          {teacher?.teacher?.gender === 'M' ? 'Male' :
                               teacher?.teacher?.gender === 'F' ? 'Female' : "N/A"}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#7A7A7A] line-clamp-2">
                        {teacher?.teacher?.description || ""}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/teacher/${teacher?.teacher?._id}?book=true`);
                        }}
                        className="font-medium cursor-pointer rounded-full py-2 px-5 bg-[#55844D] hover:bg-[#3d5e37] text-white text-sm lg:text-base transition-all"
                      >
                        Book
                      </button>

                      <Link
                        href={`/student/message?query=${teacher?.teacher?.userId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-medium cursor-pointer rounded-full py-2 px-5 bg-[#55844D] hover:bg-[#3d5e37] text-white text-sm lg:text-base transition-all"
                      >
                        Message
                      </Link>
                    </div>
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
