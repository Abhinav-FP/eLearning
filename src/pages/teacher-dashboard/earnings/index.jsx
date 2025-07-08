import React, { useEffect, useMemo, useState } from "react";
import TeacherLayout from "../Common/TeacherLayout";
import Card from "./Card";
import Earning from "./Earning";
import Listing from "@/pages/api/Listing";
import moment from "moment";
import { TeacherEarningsLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";
import { FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { MdPaid } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdRequestQuote } from "react-icons/md";
import * as XLSX from 'xlsx';
import toast from "react-hot-toast";

export default function index() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("last30");
  const [searchText, setSearchText] = useState("");
  const[tabOpen,setTabOpen] = useState("bookings")

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
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

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherEarning(selectedOption, searchText);
      setData(response?.data?.data || []);
    } catch (error) {
      console.log("error", error);
      setData({});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, [selectedOption, searchText]);

  const downloadExcel = () => {
    if (data && data?.bookings && data?.bookings?.length == 0) {
      toast.error("No data to export");
      return;
    }
    const result = data && data?.bookings && data?.bookings?.map(item => ({
      LessonName: item?.LessonId?.title || "",
      LessonDate: moment(item?.startDateTime).format("DD MMM YYYY, hh:mm A") || "",
      PaymentId: moment(item?.StripepaymentId?.created_at || item?.paypalpaymentId?.created_at)
        .format("DD MMM YYYY, hh:mm A") || "" || "",
      PaymentDate: moment(item?.StripepaymentId?.created_at || item?.paypalpaymentId?.created_at)
        .format("DD MMM YYYY, hh:mm A") || "",
      Amount: formatMultiPrice(item?.teacherEarning, "USD") || ""
    }));
    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Earnings.xlsx');
  };


  const stats = useMemo(
    () => [
      {
        label: "Total Earnings",
        value: data?.earningsSummary?.totalEarnings ?? "N/A",
        icon: <FaMoneyBillWave className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "Available Earnings (Completed Lessons)",
        value: data?.earningsSummary?.pendingEarnings ?? "N/A",
        icon: <FaWallet className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "Requested Earnings",
        value: data?.earningsSummary?.requestedEarnings ?? "N/A",
        icon: <MdRequestQuote className="w-6 h-6 text-[#CC2828]" />,
      },
      {
        label: "Paid Earnings",
        value: data?.earningsSummary?.approvedEarnings ?? "N/A",
        icon: <MdPaid className="w-6 h-6 text-[#CC2828]" />,
      },
    ],
    [data]
  );

  const [IsEarning, setIsEarning] = useState(false);
  const close = () => setIsEarning(false);

  // console.log("data",data);

  return (
    <TeacherLayout page={"Earnings"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-wrap justify-between items-center mb-4 lg:mb-5">
          {/* <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
              Earnings
            </h2> */}
          <div className="w-full mb-4 md:mb-0 md:w-1/3 md:max-w-sm relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#888]"/>
            </span>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search using name or payment id"
              className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CC2828] placeholder-gray-400"
            />
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:space-x-3 justify-between">
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
            <div className="space-x-3 w-full md:w-auto flex md:block justify-between">
              <button
                onClick={() => {
                  // if(selectedOption !== "")
                  //   {
                  //     toast.error("Please select time duration as All before requesting payout");
                  //     return;
                  //   }
                  setIsEarning(true);
                }}
                className="w-fit px-2 px-4 xl:px-8 py-2 h-[44px] hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-md tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
              >
                Request Payout
              </button>
              <button
                onClick={() => {
                  downloadExcel();
                }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
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
            <div className="flex flex-wrap gap-5 mb-4">
              <button
                onClick={() => setTabOpen('bookings')}
                className={`px-2 px-4 xl:px-8 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${tabOpen === 'bookings'
                  ? 'bg-[#CC2828] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
                  }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setTabOpen('bonus')}
                className={`px-2 px-8 xl:px-12 py-2 h-[44px] rounded-md tracking-[-0.06em] text-base font-medium  cursor-pointer ${tabOpen === 'bonus'
                  ? 'bg-[#CC2828] text-[#fff]'
                  : 'bg-[#E0E0E0] text-[#727272]'
                  }`}
              >
                Bonus
              </button>
            </div>
            <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
              {tabOpen === 'bookings' &&
              <table className="min-w-full text-sm text-center rounded-[20px]">
                <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                  <tr>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Lesson Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Lesson date
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Payment Id
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Payment date
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Amount
                    </th>
                    {/* <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Payout Status
                </th> */}
                  </tr>
                </thead>

                <tbody>
                  {data && data?.bookings && data?.bookings?.length > 0 ? (
                    data?.bookings?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                      >
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                          {item?.LessonId?.title || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                          {moment(item?.startDateTime).format(
                            "DD MMM YYYY, hh:mm A"
                          ) || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          {item?.StripepaymentId?.payment_id ||
                            item?.paypalpaymentId?.orderID ||
                            ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          {moment(
                            item?.StripepaymentId?.created_at ||
                            item?.paypalpaymentId?.created_at
                          ).format("DD MMM YYYY, hh:mm A") || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          {formatMultiPrice(item?.teacherEarning, "USD") || ""}
                        </td>
                        {/* <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                                    {item?.payoutStatus}
                                  </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <div className="mt-2">
                          <NoData
                            Heading={"No data found"}
                            content={
                              "No booking data found with the selected filters."
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>}
              {tabOpen === 'bonus' &&
              <table className="min-w-full text-sm text-center rounded-[20px]">
                <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                  <tr>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Lesson Name
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Lesson date
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Payment Id
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Payment date
                    </th>
                    <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                      Amount
                    </th>
                    {/* <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Payout Status
                </th> */}
                  </tr>
                </thead>

                <tbody>
                  {data && data?.bonusData && data?.bonusData?.length > 0 ? (
                    data?.bonusData?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                      >
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                          {item?.LessonId?.title || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                          {moment(item?.bookingId?.startDateTime).format(
                            "DD MMM YYYY, hh:mm A"
                          ) || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          {item?.StripepaymentId?.payment_id ||
                            item?.paypalpaymentId?.orderID ||
                            ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          {moment(
                            item?.StripepaymentId?.created_at ||
                            item?.paypalpaymentId?.created_at
                          ).format("DD MMM YYYY, hh:mm A") || ""}
                        </td>
                        <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                          {formatMultiPrice(item?.amount, "USD") || ""}
                        </td>
                        {/* <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter capitalize">
                                    {item?.payoutStatus}
                                  </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <div className="mt-2">
                          <NoData
                            Heading={"No data found"}
                            content={
                              "No bonus data found with the selected filters."
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>}
            </div>
          </>
        )}
      </div>

      {IsEarning && (
        <Earning
          isOpen={IsEarning}
          onClose={close}
          data={data?.totalPendingEarning}
          fetchEarnings={fetchEarnings}
        />
      )}
    </TeacherLayout>
  );
}
