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

export default function index() {
  const [data, setData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [page, setPage] =useState(1);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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
      "Payment ID": item?.StripepaymentId?.payment_id || item?.paypalpaymentId?.orderID || "",
      "Start Time": moment(item?.startDateTime).format("DD MMM YYYY, hh:mm A") || "",
      "Teacher Name": item?.teacherId?.name || "",
      "Total Payment": formatMultiPrice(item?.totalAmount, "USD") || "",
      "Admin Commission": formatMultiPrice(item?.adminCommission, "USD") || "",
      "Student Name": item?.UserId?.name || "",
      "Duration (mins)": item?.LessonId?.duration || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "Earnings.xlsx");
  };

  const stats = useMemo(
    () => [
      {
        label: "Total Earnings",
        value: data?.count?.totalAmount?.toFixed(2) ?? "N/A",
        icon: <FaMoneyBillWave className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "Teachers Earnings",
        value: data?.count?.teacherEarning?.toFixed(2) ?? "N/A",
        icon: <MdWallet className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "My Earnings",
        value: data?.count?.adminCommission?.toFixed(2) ?? "N/A",
        icon: <MdRequestQuote className="w-6 h-6 text-[#CC2828]" />,
      },
      // {
      //   label: "Total Bonus/Tips",
      //   value: data?.count?.bonus?.toFixed(2) ?? "N/A",
      //   icon: <MdPaid className="w-6 h-6 text-[#CC2828]" />,
      // },
    ],
    [data]
  );

  return (
    <AdminLayout page={"Earnings"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-wrap justify-between items-center mb-4 lg:mb-5">
          {/* Search Input */}
          <div className="w-full mb-4 md:mb-0 md:w-1/3 md:max-w-sm relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#888]" />
            </span>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search using payment ID, lesson, teacher, or student name"
              className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-1 focus:ring-[#CC2828] placeholder-gray-400"
            />
          </div>

          <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:space-x-3 justify-between ">
            {/* Dropdown Filter */}
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="w-full md:w-auto border border-[#ddd] h-[44px] text-[#000] px-2 sm:px-3 xl:px-4 py-2 mb-4 md:mb-0  rounded-md focus:outline-none"
            >
              <option value="">All</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {/* Export Button */}
            <div className="space-x-3 w-full md:w-auto flex md:block justify-between">
              <button
                onClick={downloadExcel}
                className="w-fit px-2 px-4 xl:px-8 py-2  h-[44px] hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-md tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
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
            <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto ">
              <table className="min-w-full text-sm text-center rounded-[20px]">
                <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                  <tr>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Lesson Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Payment ID
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Booking Creation Time
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Teacher Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Total Payment
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      My Earning
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Student Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Duration
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings && bookings?.length > 0 ? (
                    bookings?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                      >
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize whitespace-nowrap">
                          {item?.LessonId?.title || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                          {item?.StripepaymentId?.payment_id ||
                            item?.paypalpaymentId?.orderID ||
                            ""}
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
                          {formatMultiPrice(item?.totalAmount, "USD") || ""}
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
                className="w-fit px-2 px-4 xl:px-8 py-2  h-[44px] hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-full tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
              >
                {buttonLoading ? "Loading" : "See More"}
              </button>
            </div>
            :
            <></>
            }
          </>
        )}
      </div>
    </AdminLayout>
  );
}
