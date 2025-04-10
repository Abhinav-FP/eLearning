import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import Logo from "../../Assets/Images/logo.png"
import Image from "next/image";
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";

function SideBar({ user }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen &&
                <button
                    className="lg:hidden p-2 absolute left-[213px] top-6 text-red-700 border border-red-700 z-[99] rounded"
                    onClick={() => setIsOpen(false)}
                >
                    <IoMdArrowRoundBack size={18} />
                </button>}
            {!isOpen &&
                <button
                    className="lg:hidden p-2 fixed font-bold top-2.5 text-[#565F66] z-[99]"
                    onClick={() => setIsOpen(true)}
                >
                    <IoIosMenu size={24} />
                </button>}

            <div
                className={`z-50 custom_scroll border border-r border-black border-opacity-10 w-[260px] md:w-[304px] fixed left-0 top-0 bottom-0 overflow-y-auto bg-white transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:block`}
            >
                <div className="px-3 md:px-4 lg:px-6">
                    <Image src={Logo} alt="FriegtFlow Logo" className="h-[90px] w-[98px] mr-2" />
                </div>

                <div className="px-3 md:px-4 lg:px-6 py-4 lg:py-5">

                    <div className="w-[220px] p-4 bg-white shadow-md rounded-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white text-xl font-bold">
                            {/* Replace with an actual image if needed */}
                            <img
                                src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-sm capitalize  text-gray-900">{user?.name}</p>
                            <p className="text-xs  capitalize  text-gray-500">{user?.role}</p>
                        </div>
                    </div>
                    <div className="mb-4 mt-8 font-medium">
                        <div className="uppercase text-[#808080] text-sm font-medium mb-4 lg:mb-5">MAIN MENU</div>
                        <ul className="mt-2 space-y-1 mb-10">
                            <Link
                                href="/student"
                                className={`flex items-center py-2.5 px-2.5 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/student" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} rounded-md`}
                            >
                                <RxDashboard size={20} />
                                Dashboard
                            </Link>
                            <Link
                                href="/student/lessons"
                                className={`flex items-center py-2.5 px-2.5 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/student/lessons" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} rounded-md`}
                            >
                                <MdClass size={20} />
                                My Lessons
                            </Link>
                            <Link
                                href="/student/teachers"
                                className={`flex items-center py-2.5 px-2.5 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/student/teachers" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} rounded-md`}
                            >
                                <FaChalkboardTeacher size={20} />
                                Find a Teachers
                            </Link>
                            <Link
                                href="/student/message"
                                className={`flex items-center py-2.5 px-2.5 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/student/message" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} rounded-md`}
                            >
                                <LuMessagesSquare size={20} />
                                Messages
                            </Link>
                            <Link
                                href="/student/payment-history"
                                className={`flex items-center py-2.5 px-2.5 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/student/payment-history" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} rounded-md`}
                            >
                                <MdPayment size={20} />
                                Payments
                            </Link>
                            <Link
                                href="/student/review"
                                className={`flex items-center py-2.5 px-2.5 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/student/review" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} rounded-md`}
                            >
                                <MdOutlineRateReview size={20} />
                                Reviews
                            </Link>
                            <Link
                                href="/student/setting"
                                className={`flex items-center py-2.5 px-2.5 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/student/setting" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} rounded-md`}
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
