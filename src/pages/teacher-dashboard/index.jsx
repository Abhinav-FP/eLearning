import React, { useEffect, useState } from "react";
import TeacherLayout from "./Common/TeacherLayout";
import { FaWallet, FaCalendar, FaStar, FaFileAlt, } from "react-icons/fa";
import { MdUpcoming, MdAttachMoney, MdReviews, MdCheckCircle } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import Listing from "../api/Listing";
import moment from "moment";
import { TeacherDashboardLoader } from "@/components/Loader";
import NoData from "../common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";

export default function Index() {
  const [Dashboard, SetDashboard] = useState("")
  const [loading, setLoading] = useState(false);

  const DashboardCount = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherDashboard();
      SetDashboard(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    DashboardCount();
  }, []);
  const resultArray = Dashboard?.result || [];
  const resultMap = resultArray.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {
    duration30: 0,
    duration50: 0,
    durationOther: 0
  });


  return (
    <TeacherLayout>
      {loading ?
        <TeacherDashboardLoader />
        :
        <div className="min-h-screen p-5 lg:p-[30px]">
          <div className="flex justify-between items-center">
            <h1 className="font-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-2">
              Welcome Back!
            </h1>
            <Link
              href="/teacher-dashboard/setting"
              className="flex w-fit ml-auto mb-4 lg:mb-5 px-2 sm:px-8 py-2.5 text-[#CC2828] border border-[#CC2828] rounded-md tracking-[-0.06em] text-sm font-medium hover:bg-[#CC2828] hover:text-white cursor-pointer"
            >
              Edit Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Lesson Prices */}
            <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[120px] md:min-h-[136px]">
              <h2 className="font-inter text-[#CC2828] font-bold text-base sm:text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em] pr-16">
                Lesson Price
              </h2>
              <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
                <Link href="/teacher-dashboard/profile" >
                  <MdAttachMoney className="text-[#CC2828]" size={24} />
                </Link>
              </div>
              <div className="flex flex-col gap-1 mt-6 xl:mt-4">
                {Dashboard?.TeacherData?.length > 0 ? (
                  Dashboard.TeacherData.map((lesson, index) => (
                    <p
                      key={index}
                      className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between"
                    >
                      <span className="capitalize">{lesson.title}</span>
                      <span>
                        {formatMultiPrice(lesson.price, "USD")} / {lesson.duration} minutes
                      </span>
                    </p>
                  ))
                ) : (
                  <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black">
                    N/A
                  </p>
                )}
              </div>

            </div>

            {/* Total Reviews */}
            <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[120px] md:min-h-[136px]">
              <h2 className="font-inter text-[#CC2828] font-bold text-base sm:text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em] pr-16">
                Total Reviews
              </h2>
              <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
                <Link href="/teacher-dashboard/review">
                <MdReviews className="text-[#CC2828]" size={24} />
                </Link>
              </div>
              <div className="text-sm text-[#535353] space-y-1 mt-4">
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-[-0.04em]">{Dashboard?.ReviewesCount}</p>
              </div>
            </div>

            {/* Payment Earnings */}    
            {/* <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[120px] md:min-h-[136px]">
              <h2 className="font-inter text-[#CC2828] font-bold text-base sm:text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em] pr-16">
                Payment Earnings (Last 30 Days)
              </h2>
              <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
                <Link href="/teacher-dashboard/earnings">
                  <FaWallet className="w-6 h-6 text-[#CC2828]" />
                </Link>
              </div>
              <div className="text-lg space-y-1.5 mt-8 xl:mt-8">
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  Stripe Earnings: <span>{formatMultiPrice(Dashboard?.stripepay, "USD")}</span>
                </p>
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  Paypal Earnings: <span>{formatMultiPrice(Dashboard?.paypalpay, "USD")}</span>
                </p>
              </div>
            </div> */}

            {/* Upcoming Lessons */}
            <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[120px] md:min-h-[136px]">
              <h2 className="font-inter text-[#CC2828] font-bold text-base sm:text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em] pr-16">
                Upcoming Lessons
              </h2>
              <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
                < Link href="/teacher-dashboard/booking">
                  <MdUpcoming className="text-[#CC2828]" size={24} />
                </Link>
              </div>
              {Dashboard?.upcomingLesson && Dashboard?.upcomingLesson?.length > 0 ?
                <div className="text-lg space-y-1.5 mt-8 xl:mt-8">
                  {Dashboard?.upcomingLesson?.map((item, index) => (
                    <div className="" key={index}>
                      <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                        {item?.LessonId?.title}
                        <span>
                          {moment(item?.startDateTime).format("DD MMM YYYY")}{" "}
                          {moment(item?.startDateTime).format("hh:mm A")}
                        </span>
                      </p>
                    </div>
                  ))}

                </div>
                :
                <NoData
                  Heading={"No upcoming lesson found"}
                />
              }
            </div>

            {/* Total Lessons Completed */}
            <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[120px] md:min-h-[136px]">
              <h2 className="font-inter text-[#CC2828] font-bold text-base sm:text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em] pr-16">
                Total lessons completed
              </h2>
              <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
                < Link href="/teacher-dashboard/booking">
                  <FaFileAlt className="text-[#CC2828]" size={24} />
                </Link>
              </div>
              <div className="text-lg space-y-1.5 mt-8 xl:mt-8">
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  30 mins: <span>{resultMap?.duration30}</span>
                </p>
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  60 mins: <span>{resultMap?.duration60 || 0}</span>
                </p>
                {/* <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  Custom: <span>{resultMap.durationOther}</span>
                </p> */}
              </div>

            </div>

            {/* Earnings */}    
            {/* <div className="relative bg-white rounded-xl dashboard-box p-3.5 lg:p-4 xl:p-5 border border-[rgba(204,40,40,0.2)] flex flex-col min-h-[120px] md:min-h-[136px]">
              <h2 className="font-inter text-[#CC2828] font-bold text-base sm:text-lg lg:text-xl xl:text-2xl capitalize tracking-[-0.04em] pr-16">
                Earnings (Last 30 Days)
              </h2>
              <div className="absolute right-4 lg:right-5 xl:right-6 bg-[#CC28281A] border-[0.67px] border-[#CC282880] p-3 rounded">
                <Link href="/teacher-dashboard/earnings">
                  <FaWallet className="w-6 h-6 text-[#CC2828]" />
                </Link>
              </div>
              <div className="text-lg space-y-1.5 mt-8 xl:mt-8">
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  Total Earnings: <span>{formatMultiPrice(Dashboard?.earningsSummary?.totalEarnings, "USD")}</span>
                </p>
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  Available Earnings (completed lesson): <span>{formatMultiPrice(Dashboard?.earningsSummary?.pendingEarnings, "USD")}</span>
                </p>
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  Requested Earnings: <span>{formatMultiPrice(Dashboard?.earningsSummary?.requestedEarnings || 0, "USD")}</span>
                </p>
                <p className="font-inter text-sm sm:text-base lg:text-lg xl:text-xl font-medium tracking-[-0.04em] text-black flex justify-between">
                  Paid Earnings: <span>{formatMultiPrice(Dashboard?.earningsSummary?.approvedEarnings, "USD")}</span>
                </p>
              </div>
            </div> */}

          </div>
        </div>}
    </TeacherLayout>
  );
}
