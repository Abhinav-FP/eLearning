import React from "react";
import TeacherLayout from "./Common/TeacherLayout";
import {
  FaWallet,
  FaCalendar,
  FaStar,
  FaFileAlt,
} from "react-icons/fa";
import { MdUpcoming, MdAttachMoney, MdReviews, MdCheckCircle} from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";

export default function Index() {
  return (
    <TeacherLayout>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex justify-between items-center">
          <h1 className="font-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-2">
            Welcome Back!
          </h1>
          <Link
            href="/student/favourite-teacher"
            className="flex w-fit ml-auto mb-4 lg:mb-5 px-2 sm:px-8 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px] tracking-[-0.06em] text-sm font-medium hover:bg-[#CC2828] hover:text-white cursor-pointer"
          >
            Edit Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">

          {/* Total Earnings */}
          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Total Earnings
            </h2>
            {/* <div className="relative"> */}
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <FaWallet className="text-[#CC2828]" size={24} />
            </div>
            {/* </div> */}
            <div className="text-sm text-[#535353] space-y-1 mt-4">
              <p className="font-inter text-base lg:text-lg xl:text-xl font-bold tracking-[-0.04em]">$1200 + ¥1,76,882</p>
            </div>
          </div>

          {/* Upcoming Lessons */}
          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Upcoming Lessons
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <MdUpcoming className="text-[#CC2828]" size={24} />
            </div>
            <div className="text-sm flex flex-row gap-12 text-[#535353] space-y-1 mt-4">
              <div className="flex flex-col gap-1 text-lg">
                <p className="font-inter text-base lg:text-lg xl:text-xl font-bold tracking-[-0.04em] text-[#535353] mb-.5 ">APRIL 25</p>
                <p className="font-inter text-base lg:text-lg xl:text-xl font-bold tracking-[-0.04em] text-[#535353] mb-0 ">11:00 AM</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex mt-1.5 mb-1.5 text-yellow-500">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                </div>
                <span className="text-base text-black">(25)</span>
              </div>
            </div>
          </div>

          {/* Lesson Prices */}
          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Lesson Prices
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <MdAttachMoney className="text-[#CC2828]" size={24} />
            </div>
            <div className="flex gap-3 text-lg font-semibold mt-6 xl:mt-4 items-center">
              <p className="flex gap-1 items-center font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black "><MdCheckCircle size={18}/> $70/1 Hour</p>
              <p className="flex gap-1 items-center font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black"><MdCheckCircle size={18} /> $40/30 min</p>
            </div>
          </div>

          {/* Total Lessons Completed */}
          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Total lessons completed
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <FaFileAlt className="text-[#CC2828]" size={24} />
            </div>
            <div className="text-lg space-y-1.5 mt-6 xl:mt-8">
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                30 mins: <span>14</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                50 mins: <span>20</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Custom: <span>15</span>
              </p>
            </div>
          </div>

          {/* Add Availability */}
          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Add Availability
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <FiPlus className="text-[#CC2828]" size={24} />
            </div>
            <div className="text-sm text-[#535353] space-y-1 mt-4">
              <div className="bg-[#CC28281A] border-[0.67px] border-[#CC282880]/50 p-3 w-12 h-12 rounded">
                <FaCalendar className="text-[#CC2828] w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Total Reviews */}
          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Total Reviews
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <MdReviews className="text-[#CC2828]" size={24} />
            </div>
            <div className="text-sm text-[#535353] space-y-1 mt-4">
              <p className="font-inter text-base lg:text-lg xl:text-xl font-bold tracking-[-0.04em]">124</p>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}

// function Card({ title, icon, children }) {
//   return (
//     <div className="relative bg-white rounded-xl shadow-sm p-4 border border-red-100 flex flex-col justify-between">
//         <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl capitalize">{title}</h2>
//       <div className="relative">
//         <div className="absolute right-2 bg-[#CC28281A] border-[0.67px] border-[#CC282880]/50 p-3 rounded">{icon}</div>
//       </div>
//       <div className="text-sm text-[#535353] space-y-1">{children}</div>
//     </div>
//   );
// }
