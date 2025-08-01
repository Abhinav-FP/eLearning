import React, { useEffect, useMemo, useRef, useState } from 'react';
import TeacherLayout from '../Common/TeacherLayout';
import Listing from '@/pages/api/Listing';
import moment from 'moment';
import { TableLoader } from '@/components/Loader';
import NoData from '@/pages/common/NoData';
import { formatMultiPrice } from '@/components/ValueDataHook';
import { FiSearch } from 'react-icons/fi';
import ZoomPopup from '@/pages/admin/booking/ZoomPopup';
import BookingView from '@/pages/admin/common/BookingView';
import CancelPopup from './CancelPopup';

export default function Index() {
  const [TabOpen, setTabOpen] = useState('upcoming');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const timerRef = useRef(null);

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

  useEffect(() => {
    fetchEarnings();
  }, [TabOpen]);


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
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const diffInMs = end - start;
    const diffInMinutes = diffInMs / (1000 * 60);
    return diffInMinutes;
  }


  return (
    <TeacherLayout page={"Booking"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 lg:mb-5">
            <div className="flex flex-wrap gap-5 mb-4 md:mb-0">
              <button
                onClick={() => setTabOpen('upcoming')}
                className={`px-2 px-4 xl:px-8 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${TabOpen === 'upcoming'
                  ? 'bg-[#CC2828] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
                  }`}
              >
                Upcoming & Ongoing
              </button>
              <button
                onClick={() => setTabOpen('past')}
                className={`px-2 px-8 xl:px-12 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${TabOpen === 'past'
                  ? 'bg-[#CC2828] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
                  }`}
              >
                Past
              </button>
              <button
                onClick={() => setTabOpen('cancelled')}
                className={`px-2 px-8 xl:px-12 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${TabOpen === 'cancelled'
                  ? 'bg-[#CC2828] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
                  }`}
              >
                Cancelled
              </button>
            </div>
            <div className="w-full md:w-1/3 md:max-w-sm relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-[#888]" />
              </span>
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search using lesson or student name"
                className="w-full pl-10 pr-4 py-2 border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-1 focus:ring-[#CC2828] placeholder-gray-400"
              />
            </div>
          </div>

          <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
            <table className="min-w-full text-sm text-center rounded-[20px]">
              <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
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
                  {data && data.length > 0 ? (
                    data?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                      >
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          <div className="flex justify-center items-center gap-2 whitespace-nowrap">
                            <span className="capitalize">{item?.LessonId?.title}</span>
                            {item?.zoom && item?.zoom?.meetingLink && isBeforeEndTime(item?.endDateTime) &&
                              <a
                                href={item?.zoom?.meetingLink || ""}
                                target="blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-[#CC2828] text-white px-2 py-[2px] rounded-md hover:bg-[#b22424] transition cursor-pointer"
                              >
                                Join Now
                              </a>}
                          </div>
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                          {moment(item?.startDateTime).format('DD MMM YYYY, hh:mm A') || ''}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                          {item?.UserId?.name}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize min-w-[240px] text-black text-sm lg:text-base font-medium font-inter ">
                          {calculateDurationMinutes(item?.startDateTime, item?.endDateTime)} min{" "}
                          ({moment(item?.startDateTime).format('hh:mm A')} -{" "}
                          {moment(item?.endDateTime).format('hh:mm A')})
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                          {formatMultiPrice(item?.teacherEarning, "USD")}
                        </td>
                        {TabOpen === "past" &&
                        <td>
                          {/* {item?.zoom ? ( */}
                            <BookingView data={item} status= {"teacher"} />
                          {/* // ) : (
                          //   <span>N/A</span>
                          // )} */}
                        </td>}
                        {TabOpen === "upcoming" &&
                        <td>
                          {isMoreThanTwoHourFromNow(item?.startDateTime) ?
                          <CancelPopup data={item} fetchEarnings={fetchEarnings}/>
                          :
                          "N/A"
                          }
                        </td>}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={TabOpen === "past" ? 6 : 5}>
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
    </TeacherLayout>
  );
}