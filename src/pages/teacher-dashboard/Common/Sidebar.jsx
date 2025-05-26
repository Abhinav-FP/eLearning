import React, { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import Logo from "../../Assets/Images/logo.png";
import Image from "next/image";
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
// New Icons
import { CgProfile } from "react-icons/cg";
import { IoPricetags } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";
import { useRole } from "@/context/RoleContext";

function SideBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useRole();
    // console.log("user",user);

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
                        <Image src={Logo} alt="FriegtFlow Logo" className="h-[85px] w-[105px] mx-2 inline-block" />
                    </Link>
                </div>

                <div className="px-3 lg:px-4">
                    <Link href = "/teacher-dashboard/setting" className="user_row p-2.5 bg-white shadow-md rounded-lg lg:rounded-xl flex items-center gap-3">
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
                                href="/teacher-dashboard"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <MdSpaceDashboard  size={20} />
                                Dashboard
                            </Link>
                            <Link
                                href="/teacher-dashboard/profile"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6  gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/profile" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <CgProfile size={20} />
                                Profile & Lessons
                            </Link>
                            <Link
                                href="/teacher-dashboard/availability"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/availability" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"} `}
                            >
                                <IoPricetags size={20} />
                                Pricing & Availability
                            </Link>
                            <Link
                                href="/teacher-dashboard/message"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/message" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <LuMessagesSquare size={20} />
                                Messages
                            </Link>
                            <Link
                                href="/teacher-dashboard/earnings"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/earnings" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <FaWallet size={20} />
                                Earnings
                            </Link>
                            <Link
                                href="/teacher-dashboard/payouts"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/payouts" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <MdOutlineRateReview size={20} />
                                Payouts
                            </Link>
                            <Link
                                href="/teacher-dashboard/booking"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/booking" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
                            >
                                <MdOutlineRateReview size={20} />
                                Bookings
                            </Link>
                            <Link
                                href="/teacher-dashboard/setting"
                                className={`flex items-center py-2.5 x-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${pathname === "/teacher-dashboard/setting" ? "text-white bg-[#D6202C]" : "hover:bg-gray-100"}`}
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