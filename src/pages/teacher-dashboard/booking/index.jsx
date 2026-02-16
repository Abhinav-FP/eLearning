import React, { useEffect, useMemo, useRef, useState } from 'react';
import TeacherLayout from '../Common/TeacherLayout';
import Listing from '@/pages/api/Listing';
import moment from 'moment';
import { TableLoader } from '@/components/Loader';
import NoData from '@/pages/common/NoData';
import { formatMultiPrice } from '@/components/ValueDataHook';
import { FiSearch } from 'react-icons/fi';
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdReplay } from "react-icons/md";
import ZoomPopup from '@/pages/admin/booking/ZoomPopup';
import BookingView from '@/pages/admin/common/BookingView';
import CancelPopup from './CancelPopup';
import { MdCheck } from "react-icons/md";
import Link from 'next/link';
import toast from 'react-hot-toast';
import ReschedulePopup from '@/pages/student/lessons/ReschedulePopup';
import PastReschedule from './PastReschedule';
import { useRole } from '@/context/RoleContext';

export default function Index() {
  const [TabOpen, setTabOpen] = useState('upcoming');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [doneId, setDoneId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [syncing, setSyncing] = useState(false);
  const timerRef = useRef(null);
  const { user } = useRole();

  // Both are required
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPastRescheduleOpen, setIsPastRescheduleOpen] = useState(false);
  const [studentTimeZone, setStudentTimeZone] = useState(null);

  const closePopup = () => {
    if (user && user?.role != "student" && user?.time_zone) {
      moment.tz.setDefault(user.time_zone);
    }
    setIsPopupOpen(false);
    setStudentTimeZone("");
  }

  const closePastReschedulePopup = () => {
    if (user && user?.role != "student" && user?.time_zone) {
      moment.tz.setDefault(user.time_zone);
    }
    setIsPastRescheduleOpen(false);
  }

  const fetchEarnings = async (search = "") => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherBooking(TabOpen, search);
      setData(response?.data?.data || []);
    } catch (error) {
      console.log('error', error);
      setData([]);
    }
    setLoading(false);
  };

  const handleCalendarSync = async () => {
    try {
      setSyncing(true);
      const main = new Listing();
      const response = await main.SyncGoogleCalendar();
      if(response?.data?.status){
        toast.success(response?.data?.message || "Calendar updated successfully");
      }
      else{
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Calendar sync failed");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, [TabOpen]);

  
  useEffect(() => {
   if (user && user?.role != "student" && user?.time_zone) {
      moment.tz.setDefault(user?.time_zone);
    }
  }, []);

  useEffect(() => {
    if (!studentTimeZone) return;

    moment.tz.setDefault(studentTimeZone);

    return () => {
      if (user && user?.role != "student" && user?.time_zone) {
       moment.tz.setDefault(user?.time_zone);
      }
    };
  }, [studentTimeZone]);

  const handleSearchChange = (e) => {
    const sval = e.target.value;
    setSearchText(sval);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!sval || sval.trim() === "") {
      timerRef.current = setTimeout(() => {
        fetchEarnings(sval);
      }, 1500);
    } else if (sval.length >= 2) {
      timerRef.current = setTimeout(() => {
        fetchEarnings(sval);
      }, 1500);
    }
  };

  const isMoreThanTwoHourFromNow = (startDateTime) => {
    const now = new Date();
    const start = new Date(startDateTime);
    const diffInMs = start - now;
    const oneHourInMs = 2 * 60 * 60 * 1000;

    return diffInMs > oneHourInMs;
  };

  function isBeforeEndTime(endDateTime) {
  return Date.now() < new Date(endDateTime).getTime();
  }

  const calculateDurationMinutes = (startDateTime, endDateTime) => {
    const start = moment(startDateTime);
    const end = moment(endDateTime);
    return end.diff(start, "minutes");
  };

  const handleMarkAsDone = async(id) => {
    try {
      if(doneLoading) return;
      setDoneId(id);
      setDoneLoading(true);
      const main = new Listing();
      const response = await main.TeacherLessonDone(id);
      if(response?.data?.status){
        toast.success(response?.data?.message || "Lesson marked as done successfully!");
        fetchEarnings();
        setDoneId(null);
      }
      else{
        toast.error(response?.data?.message || "Something went wrong!");
        setDoneId(null);
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setDoneId(null);
    }
    setDoneLoading(false);
  }

  const isMoreThanOneHourFromNow = (startDateTime) => {
    const now = new Date();
    const start = new Date(startDateTime);
    const diffInMs = start - now;
    const oneHourInMs = 60 * 60 * 1000;

    return diffInMs > oneHourInMs;
  };


  return (
    <TeacherLayout page={"Booking"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="">
          <div className="flex flex-col gap-4 mb-4 lg:mb-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              
              {/* Tabs */}
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <button
                  onClick={() => setTabOpen("upcoming")}
                  className={`px-3 lg:px-5 py-2 h-[40px] rounded-md tracking-[-0.04em] text-sm font-medium transition cursor-pointer
                    ${TabOpen === "upcoming"
                      ? "bg-[#55844D] text-white"
                      : "bg-[#E0E0E0] text-[#727272]"
                    }`}
                >
                  Upcoming
                </button>

                <button
                  onClick={() => setTabOpen("past")}
                  className={`px-3 lg:px-5 py-2 h-[40px] rounded-md tracking-[-0.04em] text-sm font-medium transition cursor-pointer
                    ${TabOpen === "past"
                      ? "bg-[#55844D] text-white"
                      : "bg-[#E0E0E0] text-[#727272]"
                    }`}
                >
                  Past
                </button>

                <button
                  onClick={() => setTabOpen("cancelled")}
                  className={`px-3 lg:px-5 py-2 h-[40px] rounded-md tracking-[-0.04em] text-sm font-medium transition cursor-pointer
                    ${TabOpen === "cancelled"
                      ? "bg-[#55844D] text-white"
                      : "bg-[#E0E0E0] text-[#727272]"
                    }`}
                >
                  Cancelled
                </button>
              </div>

              {/* Search + Sync */}
              <div className="flex flex-row gap-2 items-stretch md:items-center w-full md:w-auto">
                <div className="relative w-1/2 sm:w-[220px] lg:w-[260px]">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-[#888]" />
                  </span>
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Search lesson or student"
                    className="w-full h-[40px] pl-9 pr-3 border border-[#ddd] text-sm text-black rounded-md
                              focus:outline-none focus:ring-1 focus:ring-[#55844D] placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={handleCalendarSync}
                  disabled={syncing}
                  className="h-[40px] px-4 rounded-md border border-[#55844D] cursor-pointer text-[#55844D] bg-white text-sm font-medium whitespace-nowrap
                            hover:bg-[#55844D] hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {syncing ? "Syncing..." : "Update Calendar"}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto">
            <table className="min-w-full text-sm text-center rounded-[20px]">
              <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                <tr>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Lesson name
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Lesson date and time
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Student Name
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Duration
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Amount
                  </th>
                  {TabOpen === "past" && (
                    <th className="font-normal text-xs sm:text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize text-gray-700">
                      Status
                    </th>
                  )}
                  {TabOpen === "past" && (
                    <th className="font-normal text-xs sm:text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize text-gray-700">
                      View Details
                    </th>
                   )}
                  {TabOpen === "upcoming" && (
                    <th className="font-normal text-xs sm:text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize text-gray-700">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              {loading ?
                <TableLoader length={TabOpen === "past" ? 6 : 5} />
                :
                <tbody>
                  {data && data?.length > 0 ? (
                    data?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[rgba(38,185,27,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                      >
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          <div className="flex justify-center items-center gap-2 whitespace-nowrap">
                            <span className="capitalize">{item?.LessonId?.title}</span>
                            {item?.zoom && item?.zoom?.meetingLink && isBeforeEndTime(item?.endDateTime) &&
                              <a
                                href={item?.zoom?.meetingLink || ""}
                                target="blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-[#55844D] text-white px-2 py-[2px] rounded-md hover:bg-[#3d5e37] transition cursor-pointer"
                              >
                                Join Now
                              </a>}
                          </div>
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                          {moment(item?.startDateTime).format('DD MMM YYYY, hh:mm A') || ''}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                          <div className="flex justify-center items-center gap-2 whitespace-nowrap">
                            <span className="capitalize">{item?.UserId?.name}</span>
                              <Link
                                href={`/teacher-dashboard/message?query=${item?.UserId?._id}`}
                                className="text-xs bg-[#55844D] text-white px-2 py-[2px] rounded-md hover:bg-[#3d5e37] transition cursor-pointer"
                              >
                                Message
                              </Link>
                          </div>
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize min-w-[240px] text-black text-sm lg:text-base font-medium font-inter ">
                          {calculateDurationMinutes(item?.startDateTime, item?.endDateTime)} min{" "}
                          ({moment(item?.startDateTime).format('hh:mm A')} -{" "}
                          {moment(item?.endDateTime).format('hh:mm A')})
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                          {formatMultiPrice(item?.teacherEarning, "USD")}
                        </td>
                        {TabOpen === "past" && (
                          <td className='py-1 md:py-0'>
                            {item?.lessonCompletedTeacher ? (
                              <div className='flex justify-center'>
                               <p className="text-[#55844D] py-2 text-sm font-medium text-center">Done</p>
                              </div>
                            ) : (
                              <div className="flex gap-2 justify-center">
                                {doneId === item?._id ? 
                                 <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                    />
                                  </svg>
                                :
                                <>
                                {/* Mark as Done */}
                                <button
                                  onClick={() => handleMarkAsDone(item._id)}
                                  className="
                                    flex items-center justify-center
                                    w-9 h-9
                                    rounded-full
                                    border border-[#55844D]
                                    text-[#55844D]
                                    bg-white
                                    hover:bg-[#55844D] hover:text-white
                                    transition
                                    disabled:opacity-60
                                    cursor-pointer
                                  "
                                  title="Mark as Done"
                                  disabled={doneId === item?._id}
                                >
                                  <MdCheck size={16} />
                                </button>
                                {/* Reschedule */}
                                <button
                                  onClick={() => {
                                    setSelectedLesson(item);
                                    setIsPastRescheduleOpen(true);
                                  }}
                                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#CC2828] text-[#CC2828] bg-white hover:bg-[#CC2828] hover:text-white transition cursor-pointer"
                                  title="Reschedule to future"
                                >
                                  <MdReplay size={16} />
                                </button>
                                </>
                                }
                              </div>
                            )}
                          </td>
                        )}
                        {TabOpen === "past" &&
                        <td>
                            <BookingView data={item} status= {"teacher"} />
                        </td>}
                        {TabOpen === "upcoming" && (
                          <td className="align-middle">
                            <div className="flex items-center justify-center gap-3">
                              {/* {isMoreThanTwoHourFromNow(item?.startDateTime) && (
                                <CancelPopup data={item} fetchEarnings={fetchEarnings} />
                              )} */}
                              {isMoreThanOneHourFromNow(item?.startDateTime) && (
                                <button
                                  onClick={() => {
                                    setSelectedLesson(item);
                                    setIsPopupOpen(true);
                                  }}
                                  className="text-green-600 font-medium font-inter transition duration-200 cursor-pointer"
                                  title="Reschedule lesson"
                                >
                                  <RiCalendarScheduleLine size={20} />
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={TabOpen === "past" ? 7 : 5}>
                        <div className="mt-2">
                          <NoData
                            Heading={"No bookings found"}
                            content={
                              `Your account does not have any ${TabOpen} booking. If a booking is made it will be shown here`
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>}
            </table>
          </div>
        </div>
      </div>
      <ReschedulePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        lesson={selectedLesson}
        studentTimeZone={studentTimeZone}
        setStudentTimeZone={setStudentTimeZone}
        fetchLessons={fetchEarnings}
      />
      <PastReschedule
        isOpen={isPastRescheduleOpen}
        onClose={closePastReschedulePopup}
        lesson={selectedLesson}
        studentTimeZone={studentTimeZone}
        setStudentTimeZone={setStudentTimeZone}
        fetchLessons={fetchEarnings}
      />
    </TeacherLayout>
  );
}