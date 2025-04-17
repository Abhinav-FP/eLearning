import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import Listing from "@/pages/api/Listing";
import Link from "next/link";

export default function Index() {
    const [teachers, setTeachers] = useState([]);

    const fetchfavouriteStudentTeachers = async () => {
        try {
            const main = new Listing();
            const response = await main.StudentfavouriteTeacher();
            console.log("res", response);
            setTeachers(response?.data?.data || []);
        } catch (error) {
            console.log("error", error);
        }
    };


    useEffect(() => {
        fetchfavouriteStudentTeachers();
    }, []);


    const handleRemoveSubmit = async (Id) => {
        console.log(":aa")
        try {
            const main = new Listing();
            const response = await main.RemoveWishlist({ teacherId: Id });
            fetchfavouriteStudentTeachers();
            console.log("res", response);
        } catch (error) {
            console.log("error", error);
        }
    };
    console.log("teacher", teachers)
    return (
        <StudentLayout page={"Favourite teacher"}>
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                {/* Lesson Cards */}
                <Link href="/student/teachers" className="flex w-fit ml-auto mb-4 sm:mb-6 px-2 sm:px-8 py-3 text-[#CC2828] border border-[#CC2828] rounded-md text-xs sm:text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer">
                    Back
                </Link>
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
                                                {teacher?.teacher?.name || ""}
                                                <span className="cursor-pointer" onClick={() => handleRemoveSubmit(teacher?.teacher?._id)}>
                                                    <FaHeart color={"#CC2828"} size={18} />
                                                </span>

                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {teacher?.teacher?.description || ""}
                                            </p>
                                            <p className="text-yellow-500 text-lg">
                                                {teacher?.teacher.average_price && (
                                                    ` $${teacher?.teacher.average_price}/${teacher?.teacher?.average_duration} min`
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
