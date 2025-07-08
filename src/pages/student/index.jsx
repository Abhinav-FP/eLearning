import React, { useEffect, useState } from 'react'
import StudentLayout from './Common/StudentLayout'
import Link from 'next/link'
import Listing from '../api/Listing';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image'
import moment from 'moment';
import { DateTime } from 'luxon';
import { StudentDashboardLoader } from '@/components/Loader';
import NoData from '../common/NoData';

export default function Index() {

  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const StudentDashboards = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.StudentDashboard();
      setDashboard(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setDashboard([]);
    }
  };

  useEffect(() => {
    StudentDashboards();
  }, []);


  return (
    <StudentLayout>
      {loading ?
        <StudentDashboardLoader />
        :
        <div className="min-h-screen p-5 lg:p-[30px]">
          <h1 className="font-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-2">Welcome Back !</h1>
          <p className="text-sm lg:text-base text-[#565F66] mb-6">
            {dashboard && dashboard?.booking
              ? `Next Lesson: ${moment(dashboard.booking.startDateTime).format("DD MMMM hh:mm A")} with ${dashboard.booking.teacherId?.name}`
              : "You don't have any upcoming bookings"}
          </p>

          {/* Row 1: Upcoming Lessons & Favorite Teachers */}
          <div className="flex flex-wrap -mx-4 mb-5 space-y-5 lg:space-y-0">
            <div className='w-full lg:w-1/2 px-4'>
              <div className="bg-white h-full p-4 lg:p-5 border border-[rgba(204,40,40,0.2)] dashboard-box rounded-[20px]">
                {dashboard && dashboard?.booking ?
                  <>
                    <h2 className="font-inter text-lg lg:text-xl tracking-[-0.04em] font-bold text-[#CC2828] mb-4">Upcoming Lessons</h2>
                    <div className="space-y-3">
                      <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'>
                        <span className='font-medium min-w-[100px]  lg:min-w-[128px]'>
                          Date :
                        </span>
                        {moment(dashboard?.booking?.startDateTime).format("DD MMMM")}
                      </p>
                      <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'>
                        <span className='font-medium min-w-[100px]  lg:min-w-[128px]'>
                          Day :</span> {moment(dashboard?.booking?.startDateTime).format('dddd')}
                      </p>
                      <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'>
                        <span className='font-medium min-w-[100px]  lg:min-w-[128px]'>
                          Teacher :
                        </span> {dashboard?.booking?.teacherId?.name}
                      </p>
                      <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'>
                        <span className='font-medium min-w-[100px]  lg:min-w-[128px]'>
                          Time :
                        </span>
                        {moment(dashboard?.booking?.startDateTime).format("hh:mm A")}
                      </p>
                    </div>
                    <Link href="/student/lessons"
                      className="inline-block mt-4 md:mt-8 bg-[rgba(204,40,40,0.1)] text-[#CC2828] px-8 py-2.5
                     rounded-full text-lg hover:bg-red-200 transition cursor-pointer">
                      Reschedule
                     </Link>
                  </>
                  :
                  <NoData className="mt-4" Heading={"No upcoming booking available"} />}
              </div>
            </div>
            <div className='w-full lg:w-1/2 px-4'>
              <div className="bg-white h-full p-4 lg:p-5 border border-[rgba(204,40,40,0.2)] dashboard-box rounded-[20px]">
                {dashboard && dashboard?.wishlistResult && dashboard?.wishlistResult?.length > 0 ?
                  <>
                    <h2 className="font-inter text-lg lg:text-xl tracking-[-0.04em] font-bold text-[#CC2828] mb-4">Favorite Teachers</h2>
                    <div className="space-y-4">
                      {dashboard?.wishlistResult?.map((wish, idx) => (
                        <Link
                          href={`/teacher/${wish?.extra?._id}`}
                          key={idx}
                          className="flex items-center justify-between
                           border border-[rgba(204,40,40,0.3)]
                            rounded-xl p-2.5"
                        >
                          <div className="flex items-center space-x-3">
                            <div>
                              <Image
                                src={wish?.teacher?.profile_photo || "/Placeholder.png"}
                                alt="Profile"
                                className="w-11 h-11 rounded-full object-cover"
                                height={40}
                                width={40}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-black
                               tracking-[-0.06em] font-inter mb-1 capitalize">{wish?.teacher?.name}</p>
                              <p className="text-xs text-[#7A7A7A] tracking-[-0.04em]
                               font-inter capitalize">{wish?.teacher?.role}</p>
                            </div>
                          </div>
                          <Link href={`/student/message?query=${wish?.teacher?._id}`} className="text-[#CC2828] 
                          font-inter text-sm font-medium tracking-[-0.06em] 
                           hover:underline cursor-pointer">
                            Message
                          </Link>
                        </Link>
                      ))}
                    </div>
                  </>
                  :
                  <NoData
                    Heading={"No favourite teacher available"}
                    content={"It looks like you haven't added any favourite teachers yet. Add some to see them here."}
                  />}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className='w-full px-4'>
              <div className="bg-white p-4 lg:p-5 border border-[rgba(204,40,40,0.2)]  rounded-[20px]">
                <h2 className="font-inter text-lg lg:text-xl tracking-[-0.04em] font-bold text-[#CC2828] mb-4">Recent Reviews</h2>
                {dashboard && dashboard?.reviews && dashboard?.reviews?.length > 0 ?
                  <div className="space-y-2">
                    {dashboard?.reviews?.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative bg-[#F6F7F7] rounded-[10px] p-4 lg:p-5"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-semibold text-[#CC2828] -tracking-[0.04em] font-inter">
                            Review on Lesson – {item?.lessonId?.title}
                          </h3>
                        </div>
                        <p className="text-sm font-medium font-inter text-black mt-1 -tracking-[0.04em]">
                          {item?.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex text-[#E4B750] space-x-1">
                            {Array.from({ length: item?.rating }).map((_, i) => (
                              <FaStar key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-sm text-[#CC2828] font-inter font-medium -tracking-[0.04em]">
                            {moment(item?.updatedAt || item?.createdAt).format(
                              "MMMM DD, YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  :
                  <NoData
                    Heading={"No reviews available"}
                  />}
              </div>
            </div>
          </div>
        </div>}
    </StudentLayout>
  )
}
