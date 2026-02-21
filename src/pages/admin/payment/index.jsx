import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../../teacher-dashboard/earnings/Card";
import Listing from "@/pages/api/Listing";
import moment from "moment";
import { TeacherEarningsLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";
import { FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { MdPaid, MdWallet } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdRequestQuote } from "react-icons/md";
import * as XLSX from 'xlsx';
import toast from "react-hot-toast";
import AdminLayout from "../common/AdminLayout";
import Link from "next/link";
import Bulk from "./Bulk";

export default function index() {
  const [data, setData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [page, setPage] =useState(1);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const[tabOpen, setTabOpen] = useState("bookings");
  const [searchText, setSearchText] = useState("");
  const timerRef = useRef(null);

  const handleSearchChange = (e) => {
    // setSearchText(e.target.value);
    const sval = e.target.value;
    setSearchText(sval);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!sval || sval.trim() === "") {
      timerRef.current = setTimeout(() => {
        fetchEarnings("");
      }, 1500);
    } else if (sval.length >= 2) {
      timerRef.current = setTimeout(() => {
        fetchEarnings(sval);
      }, 1500);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Generate years from current year down to 2025
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 2025; year--) {
    yearOptions.push(year);
  }

  const fetchEarnings = async (search, page=1) => {
    try {
      if(page===1){setLoading(true);}
      else{setButtonLoading(true);}
      const main = new Listing();
      const response = await main.AdminEarning(selectedOption, search || searchText, page);
      setData(response?.data?.data || []);
      setBookings((prev) => page === 1 ? response?.data?.data?.bookings || [] : [...prev, ...(response?.data?.data?.bookings || [])]);
    } catch (error) {
      console.log("error", error);
      setData({});
    }
    setLoading(false);
    setButtonLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, [selectedOption]);

  const LoadMore=()=>{
    const nextPage= page+1;
    setPage(nextPage);
    fetchEarnings(searchText,nextPage);    
  }

  const downloadExcel = () => {
    if (!data?.bookings || data.bookings.length === 0) {
      toast.error("No data to export");
      return;
    }
    const result = data.bookings.map(item => ({
      "Lesson Name": item?.LessonId?.title || "",
      "Payment ID": item?.StripepaymentId?.payment_id || item?.paypalpaymentId?.orderID || (item?.isFromBulk ? "Bulk Purchase" : item?.totalAmount === 0 ? "Free Booking" : ""),
      "Booking Creation Time": item?.createdAt ? moment(item.createdAt).format("DD MMM YYYY, hh:mm A") : "",
      "Teacher Name": item?.teacherId?.name || "",
      "Total Payment (excl. processing fee)": formatMultiPrice((item?.totalAmount || 0) - (item?.processingFee || 0), "USD"),
      "My Earning": formatMultiPrice(item?.adminCommission, "USD"),
      "Student Name": item?.UserId?.name || "",
      "Duration (mins)": item?.LessonId?.duration ? `${item.LessonId.duration} mins` : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    XLSX.writeFile(workbook, "Payments.xlsx");
  };

  const stats = useMemo(
    () => [
      {
        label: "Total Earnings",
        value: data?.count?.totalAmount?.toFixed(2) ?? "N/A",
        icon: <FaMoneyBillWave className="w-6 h-6 text-[#55844D]" />,
      },
      {
        label: "Teachers Earnings",
        value: data?.count?.teacherEarning?.toFixed(2) ?? "N/A",
        icon: <MdWallet className="w-6 h-6 text-[#55844D]" />,
      },
      {
        label: "My Earnings",
        value: data?.count?.adminCommission?.toFixed(2) ?? "N/A",
        icon: <MdRequestQuote className="w-6 h-6 text-[#55844D]" />,
      },
      // {
      //   label: "Total Bonus/Tips",
      //   value: data?.count?.bonus?.toFixed(2) ?? "N/A",
      //   icon: <MdPaid className="w-6 h-6 text-[#55844D]" />,
      // },
    ],
    [data]
  );

  return (
    <AdminLayout page={"Earnings"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
       <div className="mb-4 lg:mb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* LEFT: Search */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#888]" />
            </span>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search using payment ID, lesson, teacher, or student name"
              className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D] placeholder-gray-400"
            />
          </div>

          {/* RIGHT: Filter + Export */}
          <div className="flex w-full gap-3 md:w-auto md:justify-end">
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="w-full md:w-auto h-[44px] border border-[#ddd] text-[#000] px-3 rounded-md focus:outline-none"
            >
              <option value="">All</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <button
              onClick={downloadExcel}
              className="w-full md:w-auto h-[44px] px-4 xl:px-8 bg-[#55844D] text-white border border-[#55844D] rounded-md text-sm font-medium tracking-[-0.06em] hover:bg-white hover:text-[#55844D] transition cursor-pointer"
            >
              Export as Excel
            </button>
          </div>
        </div>
       </div>
        {loading ? (
          <TeacherEarningsLoader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
              {stats &&
                stats?.map((item, idx) => (
                  <Card
                    key={idx}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                  />
                ))}
            </div>
            <div className="flex flex-wrap gap-5 my-4">
              <button
                onClick={() => setTabOpen('bookings')}
                className={`px-2 px-4 xl:px-8 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${tabOpen === 'bookings'
                  ? 'bg-[#55844D] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
                  }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setTabOpen('bulk')}
                className={`px-2 px-8 xl:px-12 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${tabOpen === 'bulk'
                  ? 'bg-[#55844D] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
                  }`}
              >
                Bulk Purchases
              </button>
            </div>
            {tabOpen==="bookings" &&
            <>
            <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto ">
              <table className="min-w-full text-sm text-center rounded-[20px]">
                <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                  <tr>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      Lesson Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      Payment ID
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      Booking Creation Time
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      Teacher Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      Total Payment<br/>(excl. processing fee)
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      My Earning
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      Student Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                      Duration
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings && bookings?.length > 0 ? (
                    bookings?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[rgba(38,185,27,0.1)] border-t border-[rgba(19,101,16,0.2)]"
                      >
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize whitespace-nowrap">
                          {item?.LessonId?.title || ""}
                        </td>
                        {/* 
                        There are 4 types of booking payments currently -
                        1) Reguular booking with payment id for either stripe or paypal
                        2) Special Slot with payment, it will also have either stripe or paypal payment id
                        3) Special Slot with no payment(free slot), payment not required as amount is 0
                        4) Bulk booking, payment was already done in the past     
                        */}
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                          {item?.StripepaymentId?.payment_id ||
                            item?.paypalpaymentId?.orderID ||
                            (item?.isFromBulk ? "Bulk Purchase" : item?.totalAmount === 0 ? "Free Booking" : "")}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                          {moment(item?.createdAt).format(
                            "DD MMM YYYY, hh:mm A"
                          ) || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize whitespace-nowrap">
                          <Link href={`/admin/teacher/${item?.teacherId?._id
                            }`}>
                            {item?.teacherId?.name || ""}
                          </Link>
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                          {formatMultiPrice(item?.totalAmount-item?.processingFee, "USD") || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                          {formatMultiPrice(item?.adminCommission, "USD") || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize whitespace-nowrap">
                          {item?.UserId?.name || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize whitespace-nowrap">
                          {item?.LessonId?.duration || ""}{" "}mins
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <div className="mt-2">
                          <NoData
                            Heading={"No Earnings found."}
                            content={
                              "Your earnings will appear here once a booking is created."
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {searchText==="" && data?.pagination?.currentPage < data?.pagination?.totalPages ? 
            <div className="flex justify-center mt-4">
              <button
                onClick={LoadMore}
                className="w-fit px-2 px-4 xl:px-8 py-2  h-[44px] hover:bg-white hover:text-[#55844D] border border-[#55844D] rounded-full tracking-[-0.06em] text-sm font-medium bg-[#55844D] text-white cursor-pointer"
              >
                {buttonLoading ? "Loading" : "See More"}
              </button>
            </div>
            :
            <></>
          }
          </>
            }
            {tabOpen==="bulk" &&
            <Bulk loading={loading} data={data?.bulkPurchases || []} />
            }
          </>
        )}
      </div>
    </AdminLayout>
  );
}
