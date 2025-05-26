import React, { useEffect, useState } from "react";
import TeacherLayout from "./Common/TeacherLayout";
import { FaWallet, FaCalendar, FaStar, FaFileAlt, } from "react-icons/fa";
import { MdUpcoming, MdAttachMoney, MdReviews, MdCheckCircle } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import Listing from "../api/Listing";
import moment from "moment";
import { TeacherDashboardLoader } from "@/components/Loader";

export default function Index() {


  const [Dashboard, SetDashboard] = useState("")
  const [loading, setLoading] = useState(false);

  const DashboardCount = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherDashboard();
      // console.log("response", response)
      SetDashboard(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    DashboardCount();
  }, []);

  console.log("Dashboard", Dashboard)
  return (
    <TeacherLayout>
      {loading ? 
      <TeacherDashboardLoader/>
      :
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex justify-between items-center">
          <h1 className="font-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-2">
            Welcome Back!
          </h1>
          <Link
            href="/teacher-dashboard/setting"
            className="flex w-fit ml-auto mb-4 lg:mb-5 px-2 sm:px-8 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px] tracking-[-0.06em] text-sm font-medium hover:bg-[#CC2828] hover:text-white cursor-pointer"
          >
            Edit Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
          {/* Lesson Prices */}
          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Lesson Prices
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <MdAttachMoney className="text-[#CC2828]" size={24} />
            </div>
            <div className="flex gap-3 text-lg font-semibold mt-6 xl:mt-4 items-center">
              <p className="flex gap-1 items-center font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black "><MdCheckCircle size={18} /> ${Dashboard?.TeacherData?.average_price}/{Dashboard?.TeacherData?.average_time}</p>
              {/* <p className="flex gap-1 items-center font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black"><MdCheckCircle size={18} /> $40/30 min</p> */}
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
              <p className="font-inter text-base lg:text-lg xl:text-xl font-bold tracking-[-0.04em]">{Dashboard?.ReviewesCount}</p>
            </div>
          </div>


          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Payment Earning
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <FaWallet className="w-6 h-6 text-[#CC2828]" />
            </div>
            <div className="text-lg space-y-1.5 mt-6 xl:mt-8">
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Stripe Earnings: <span>¥{Dashboard?.stripepay}</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Paypal Earnings <span>${Dashboard?.paypalpay}</span>
              </p>
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
            <div className="text-lg space-y-1.5 mt-6 xl:mt-8">
              {Dashboard?.upcomingLesson?.map((item, index) => (
                <div className="" key={index}>
                  <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                    {item?.LessonId?.title}
                    <span>
                    {moment(item?.startDateTime).format("DD MMM YYYY")}{" "}
                    {moment(item?.startDateTime).format("hh:mm A")}
                    </span>
                  </p>
                </div>
              ))}

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
                30 mins: <span>{Dashboard?.counts?.duration30}</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                50 mins: <span>{Dashboard?.counts?.duration50}</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Custom: <span>{Dashboard?.counts?.duration60}</span>
              </p>
            </div>
          </div>

          <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[136px]">
            <h2 className="font-inter text-[#CC2828] font-bold text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em]">
              Total Earnings
            </h2>
            <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
              <FaWallet className="w-6 h-6 text-[#CC2828]" />
            </div>
            <div className="text-lg space-y-1.5 mt-6 xl:mt-8">
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Total Earnings: <span>${Dashboard?.earningsSummary?.totalEarnings}</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Requested Earnings: <span>${Dashboard?.earningsSummary?.requestedEarnings}</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Paid Earnings: <span>${Dashboard?.earningsSummary?.approvedEarnings}</span>
              </p>
              <p className="font-inter text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                Available Earnings: <span>${Dashboard?.earningsSummary?.pendingEarnings}</span>
              </p>
            </div>
          </div>

        </div>
      </div>}
    </TeacherLayout>
  );
}
