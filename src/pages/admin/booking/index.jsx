import React, { useEffect, useMemo, useRef, useState } from 'react';
import Listing from '@/pages/api/Listing';
import moment from 'moment';
import { TableLoader } from '@/components/Loader';
import NoData from '@/pages/common/NoData';
import AdminLayout from '../common/AdminLayout';
import { FiSearch } from "react-icons/fi";
import Link from 'next/link';
import ZoomPopup from './ZoomPopup';
import BookingView from '../common/BookingView';
import { formatMultiPrice } from '@/components/ValueDataHook';

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
      const response = await main.AdminBooking(search);
      setData(response?.data?.data || []);
    } catch (error) {
      console.log('error', error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  // console.log("data", data)

  // Categorize data
  const { upcoming, past, cancelled } = useMemo(() => {
    const now = moment();
    const upcoming = data.filter(item => !item.cancelled && moment(item.startDateTime).isAfter(now));
    const past = data.filter(item => !item.cancelled && moment(item.startDateTime).isBefore(now));
    const cancelled = data.filter(item => item.cancelled);
    return { upcoming, past, cancelled };
  }, [data]);

  const currentList = TabOpen === 'upcoming' 
  ? upcoming 
  : TabOpen === 'past' 
    ? past 
    : cancelled;


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


  return (
    <AdminLayout page={"Bookings"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 lg:mb-5">
          <div className="flex flex-wrap gap-5 mb-4 md:mb-0 ">
            <button
              onClick={() => setTabOpen('upcoming')}
              className={`px-2 px-4 xl:px-8 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${TabOpen === 'upcoming'
                ? 'bg-[#55844D] text-[#fff]'
                : 'bg-[#E0E0E0] text-[#727272]'
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setTabOpen('past')}
              className={`px-2 px-4 xl:px-8 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${TabOpen === 'past'
                ? 'bg-[#55844D] text-[#fff]'
                : 'bg-[#E0E0E0] text-[#727272]'
                }`}
            >
              Past
            </button>
             <button
              onClick={() => setTabOpen('cancelled')}
              className={`px-2 px-4 xl:px-8 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${TabOpen === 'cancelled'
                ? 'bg-[#55844D] text-[#fff]'
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
              placeholder="Search using lesson or teacher name"
              className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D] placeholder-gray-400"
            />
          </div>
        </div>
        <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto">
          <table className="min-w-full text-sm text-center rounded-[20px]">
            <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
              <tr>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Lesson name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Lesson date and time
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Teacher Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Student Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Duration
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Amount
                </th>
                {TabOpen === "past" && (
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                    View Details
                  </th>
                )}
              </tr>
            </thead>
            {loading ?
              <TableLoader length={6} />
              :
              <tbody>
                {currentList && currentList.length > 0 ? (
                  currentList.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[rgba(38,185,27,0.1)] border-t border-[rgba(19,101,16,0.2)]"
                    >
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                        {item?.LessonId?.title}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter min-w-[240px] ">
                        {moment(item?.startDateTime).format('DD MMM YYYY, hh:mm A') || ''}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                        <Link href={`/admin/teacher/${item?.teacherId?._id}`}>
                          {item?.teacherId?.name}
                        </Link>
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                        {item?.UserId?.name}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                        {item?.LessonId?.duration} minutes
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 capitalize text-black text-sm lg:text-base font-medium font-inter ">
                        {formatMultiPrice(item?.totalAmount, "USD")}
                      </td>
                      {TabOpen === "past" && (
                        <td >
                          {item?.zoom ? (
                            <BookingView data={item} />
                          ) : (
                            <span>N/A</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={TabOpen === "past" ? 7 : 6}>
                      <div className="mt-2">
                        <NoData
                          Heading={"No bookings found."}
                          content={
                            `There are not any ${TabOpen} bookings on the website yet matching your filters.`
                          }
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>}
          </table>
        </div>
        {/* </div> */}
      </div>
    </AdminLayout>
  );
}