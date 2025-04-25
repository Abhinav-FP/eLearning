import React, { useEffect, useState } from 'react'
import StudentLayout from './Common/StudentLayout'
import Link from 'next/link'
import Listing from '../api/Listing';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image'

export default function Index() {

  const [dahboard, setDashboard] = useState([]);

  const StudentDashboards = async () => {
    try {
      const main = new Listing();
      const response = await main.StudentDashboard();
      setDashboard(response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    StudentDashboards();
  }, []);



  return (
    <StudentLayout>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <h1 className="font-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-2">Welcome Back !</h1>
        <p className="text-sm lg:text-base text-[#565F66] mb-6">
          Next Lesson: Monday 10:00 AM with John Doe
        </p>

        {/* Row 1: Upcoming Lessons & Favorite Teachers */}
        <div className="flex flex-wrap -mx-4 mb-5 space-y-5 lg:space-y-0">
          <div className='w-full lg:w-1/2 px-4'>
            <div className="bg-white p-4 lg:p-5 border border-[rgba(204,40,40,0.2)] dashboard-box rounded-[20px]">
              <h2 className="font-inter text-lg lg:text-xl tracking-[-0.04em] font-bold text-[#CC2828] mb-4">Upcoming Lessons</h2>
              <div className="space-y-3">
                <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'><span className='font-medium min-w-[100px] min-w-[100px]  lg:min-w-[128px]'>Date :</span> 14 April</p>
                <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'><span className='font-medium min-w-[100px]  lg:min-w-[128px]'>Day :</span> Monday</p>
                <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'><span className='font-medium min-w-[100px]  lg:min-w-[128px]'>Teacher :</span> John Doe</p>
                <p className='text-[#565F66] text-base lg:text-lg font-normal flex flex-wrap'><span className='font-medium min-w-[100px]  lg:min-w-[128px]'>Time :</span> 11:00 AM</p>
              </div>
              <button className="mt-4 md:mt-8 bg-[rgba(204,40,40,0.1)] text-[#CC2828] px-8 py-2.5 rounded-full text-lg hover:bg-red-200 transition cursor-pointer">
                Reschedule
              </button>
            </div>
          </div>
          <div className='w-full lg:w-1/2 px-4'>
            <div className="bg-white p-4 lg:p-5 border border-[rgba(204,40,40,0.2)] dashboard-box rounded-[20px]">
              <h2 className="font-inter text-lg lg:text-xl tracking-[-0.04em] font-bold text-[#CC2828] mb-4">Favorite Teachers</h2>
              <div className="space-y-4">
                {dahboard?.wishlistResult?.map((wish, idx) => (
                  <Link
                    href={`/teacher/${wish?._id}`}
                    key={idx}
                    className="flex items-center justify-between  border border-[rgba(204,40,40,0.3)] rounded-xl p-2.5"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <Image
                          src="/profile.png"
                          alt="Profile"
                          className="w-11 h-11 rounded-full object-cover"
                          height={40}
                          width={40}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-black tracking-[-0.06em] font-inter mb-1">{wish?.teacher?.name}</p>
                        <p className="text-xs text-[#7A7A7A] tracking-[-0.04em] font-inter capitalize">{wish?.teacher?.role}</p>
                      </div>
                    </div>
                    <Link href={`/student/message?query=${wish?.teacher?._id}`} className="text-[#CC2828] font-inter text-sm font-medium tracking-[-0.06em]  hover:underline cursor-pointer">
                      Message
                    </Link>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className='w-full px-4'>
            <div className="bg-white p-4 lg:p-5 border border-[rgba(204,40,40,0.2)]  rounded-[20px]">
              <h2 className="font-inter text-lg lg:text-xl tracking-[-0.04em] font-bold text-[#CC2828] mb-4">Recent Reviews</h2>
              <div className="space-y-2">
                {dahboard?.reviews?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[rgba(204,40,40,0.1)] p-2.5 rounded-xl text-sm font-medium"
                  >
                    <p className='text-sm font-medium font-inter tracking-[-0.04em] text-black'>
                      {item.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="flex text-[#E4B750] text-sm">
                        {Array.from({ length: item?.rating }).map((_, i) => (
                          <FaStar key={i} size={16} fill="currentColor" />
                        ))}</div>
                    </div>
                    <p className="mt-2 font-bold text-base font-inter tracking-[-0.04em]  text-black">{item?.lessonId?.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
