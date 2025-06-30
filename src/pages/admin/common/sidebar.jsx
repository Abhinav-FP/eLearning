import React, { useState } from "react";
import { MdSpaceDashboard, MdReviews, MdPayments } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import Logo from "../../Assets/Images/logo.png";
import Image from "next/image";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useRole } from "@/context/RoleContext";

function SideBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useRole();

    return (
        <>
            {!isOpen &&
                <button
                    className="lg:hidden p-2 fixed font-bold top-2.5 text-[#565F66] z-[99]"
                    onClick={() => setIsOpen(true)}
                >
                    <IoIosMenu size={24} />
                </button>}

            <div
                className={`z-50 custom_scroll sidebar border-opacity-10 w-[260px] md:w-[286px] fixed left-0 top-0 bottom-0 overflow-y-auto bg-white transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:block`}
            >
                {isOpen &&
                    <button
                        className="lg:hidden p-2 absolute left-[213px] top-6 text-red-700 border border-red-700 z-[99] rounded"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoMdArrowRoundBack size={18} />
                    </button>}

                <div className="px-3 md:px-4 lg:px-6 text-center py-6 lg:py-8">
                    <Link href="/">
                        <Image src={Logo} alt="avatar" className="h-[85px] w-[105px] mx-2 inline-block" />
                    </Link>
                </div>

                <div className="px-3 lg:px-4">
                    <Link href="/admin/setting" className="user_row p-2.5 bg-white shadow-md rounded-lg lg:rounded-xl flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-green-400 flex items-center justify-center text-white text-xl font-bold">
                            {/* Replace with an actual image if needed */}
                            <img
                                src={user?.profile_photo || "/profile.png"}
                                alt="User Avatar"
                                className="w-11 h-11 rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium text-sm capitalize  text-black -tracking-[0.04em]">{user?.name}</p>
                            <p className="text-xs capitalize #7A7A7A text-[#7A7A7A]">{user?.role}</p>
                        </div>
                    </Link>
                </div>
                <div className="p py-4 lg:py-5">
                    <div className="mb-4 mt-8 font-medium">
                        <div className="x-3 md:px-4 lg:px-6 uppercase text-[#727272] text-sm font-medium mb-4 lg:mb-5">MAIN MENU</div>
                        <ul className="mt-2 space-y-1 mb-10">
                            <Link
                                href="/admin"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <MdSpaceDashboard size={20} />
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/teacher"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6  gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/teacher" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <PiChalkboardTeacherFill size={20} />
                                Teachers
                            </Link>
                            <Link
                                href="/admin/student"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6  gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/student" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <PiStudentFill size={20} />
                                Students
                            </Link>
                            <Link
                                href="/admin/booking"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/booking" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <MdReviews size={20} />
                                Bookings
                            </Link>
                            <Link
                                href="/admin/reviews"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/review" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <MdReviews size={20} />
                                Reviews
                            </Link>
                            <Link
                                href="/admin/home"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/home" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <FaEdit size={20} />
                                Edit Home
                            </Link>
                            <Link
                                href="/admin/payment"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/payment" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <MdPayments size={20} />
                                Earnings and Payments
                            </Link>
                            <Link
                                href="/admin/payout"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/payout" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <MdOutlineRateReview size={20} />
                                Payouts
                            </Link>
                            {/* <Link
                                href="/teacher-dashboard/earnings"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/earnings" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <FaCalendar size={20} />
                                Calendar management
                            </Link>  */}
                            <Link
                                href="/admin/setting"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/admin/setting" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <IoSettingsOutline size={20} />
                                Settings
                            </Link>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;