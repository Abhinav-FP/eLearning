import React, { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import { MdClass } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineCreditScore } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { useRole } from "@/context/RoleContext";

function SideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useRole();
  const [isEmulating, setIsEmulating] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminToken = localStorage.getItem("admintoken");
      setIsEmulating(!!adminToken);
    }
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          className="lg:hidden p-2 fixed font-bold top-2.5 text-[#565F66] z-[99]"
          onClick={() => setIsOpen(true)}
        >
          <IoIosMenu size={24} />
        </button>
      )}

      <div
        className={`z-50 custom_scroll sidebar border-opacity-10 w-[260px] md:w-[286px] fixed left-0 top-0 bottom-0 overflow-y-auto bg-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        {isOpen && (
          <button
            className="lg:hidden p-1.5 absolute left-[213px] top-3 text-red-700 border border-red-700 z-[99] rounded"
            onClick={() => setIsOpen(false)}
          >
            <IoMdArrowRoundBack size={18} />
          </button>
        )}

        <div className="px-3 md:px-4 lg:px-6 text-center py-6 lg:py-8">
          <Link href="/">
            <Image
              src={"/Logo.png"}
              alt="Japanese For Me"
              height={1000}
              width={1000}
              className="h-[85px] w-[100px] mx-2 inline-block"
            />
          </Link>
        </div>

        <div className="px-3 lg:px-4">
          <Link
            href="/student/setting"
            className="user_row p-2.5 bg-white shadow-md rounded-lg lg:rounded-xl flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {/* Replace with an actual image if needed */}
              <img
                src={user?.profile_photo || "/Placeholder.png"}
                alt="User profile photo"
                className="w-11 h-11 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                <p className="font-medium text-sm capitalize text-black -tracking-[0.04em]">
                    {user?.name}
                </p>

                {isEmulating && (
                    <span className="flex items-center gap-1 px-2 py-[2px] text-[10px] font-semibold rounded-full 
                    bg-[rgba(204,40,40,0.1)] text-[#CC2828]">
                    Emulation Mode
                    </span>
                )}
            </div>
                <p className="text-xs capitalize #7A7A7A text-[#7A7A7A]">{user?.role}</p>
            </div>
          </Link>
        </div>
        <div className="p py-4 lg:py-5">
          <div className="mb-4 mt-8 font-medium">
            <div className="px-3 md:px-4 lg:px-6 uppercase text-[#727272] text-sm font-medium mb-4 lg:mb-5">
              MAIN MENU
            </div>
            <ul className="mt-2 space-y-1 mb-10">
              <Link
                href="/student"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                } `}
              >
                <MdSpaceDashboard size={20} />
                Dashboard
              </Link>
              <Link
                href="/student/lessons"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6  gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/lessons"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                } `}
              >
                <MdClass size={20} />
                My Lessons
              </Link>
              <Link
                href="/student/teachers"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/teachers"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                } `}
              >
                <FaChalkboardTeacher size={20} />
                Find a Teacher
              </Link>
              <Link
                href="/student/message"
                className={`relative flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/message"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                }`}
              >
                <LuMessagesSquare size={20} />
                Messages
                {user?.unreadCount > 0 && (
                  <div
                    className={`h-[28px] w-[28px] text-white bg-[#D6202C] text-xs font-bold flex items-center justify-center absolute right-[22px] rounded-full top-1/2 -translate-y-1/2 ${
                      pathname === "/student/message" ? "hidden" : "block"
                    }`}
                  >
                    {user?.unreadCount > 5 ? "5+" : user?.unreadCount}
                  </div>
                )}
              </Link>
              <Link
                href="/student/payment-history"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/payment-history"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                }`}
              >
                <MdPayments size={20} />
                Payments
              </Link>
              <Link
                href="/student/credits"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/credits"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                }`}
              >
                <MdOutlineCreditScore size={20} />
                Lesson Credits
              </Link>
              <Link
                href="/student/review"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/review"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                }`}
              >
                <MdOutlineRateReview size={20} />
                Reviews
              </Link>
              <Link
                href="/student/specialslot"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/specialslot"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                }`}
              >
                <MdOutlineRateReview size={20} />
                Special Slots
              </Link>
              <Link
                href="/student/setting"
                className={`flex items-center py-2.5 px-3 md:px-4 lg:px-6 gap-2 text-[#565F66] text-base font-medium tracking-[-0.06em] ${
                  pathname === "/student/setting"
                    ? "text-white bg-[#D6202C]"
                    : "hover:bg-gray-100"
                }`}
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
