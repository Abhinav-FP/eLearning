import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";
import { TeacherLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";

export default function Index() {
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
        {/* Lesson Cards */}
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
          ) : teachers && teachers?.length > 0 ? (
            teachers?.map((teacher, idx) => (
              <div key={idx}>
                <div className="bg-white rounded-[10px] lesson_list_shadow p-3 md:p-4 lg:p-5 flex flex-col lg:flex-row lg:items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1 gap-5">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-3 mt-2">
                    <Image
                      src={teacher?.teacher?.profile_photo || "/profile.png"}
                      alt="Profile"
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-[104px] lg:h-[104px] rounded-full object-cover"
                      height={80}
                      width={80}
                    />
                    <div>
                      <p className="flex gap-2 items-center text-md sm:text-xl text-[#CC2828] font-medium">
                        {teacher?.teacher?.name || ""}
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            handleRemoveSubmit(teacher?.teacher?.userId)
                          }
                        >
                          <FaHeart color={"#CC2828"} size={18} />
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {teacher?.teacher?.description || ""}
                      </p>
                      <p className="text-yellow-500 text-lg">
                        {teacher?.teacher.average_price && teacher?.teacher?.average_duration &&
                          ` ${formatMultiPrice(teacher?.teacher.average_price, "USD")}/${teacher?.teacher?.average_duration} min`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <button className="px-6 md:px-10 lg:px-12 xl:px-16 py-2 lg:py-2.5 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                      Book
                    </button>
                    <Link
                      href={`/student/message?query=${teacher?.teacher?.userId}`}
                      className="px-6 md:px-10 lg:px-12 xl:px-16 py-2 lg:py-2.5 bg-[#CC2828] text-white rounded-md text-xs sm:text-sm hover:bg-white hover:text-[#CC2828] border border-[#CC2828] cursor-pointer"
                    >
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            ))
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
