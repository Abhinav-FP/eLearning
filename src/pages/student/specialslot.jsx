import React, { useEffect, useRef, useState } from 'react'
import NoData from '@/pages/common/NoData';
import { TableLoader } from '@/components/Loader';
import Listing from '@/pages/api/Listing';
import { formatMultiPrice } from '@/components/ValueDataHook';
import moment from 'moment';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import StudentLayout from './Common/StudentLayout';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function Index() {
  const [payout, setPayout] = useState([]);
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const SpecialSlotData = async() => {
    setLoading(true);
    const main = new Listing();
    main
      .StudentSpecialSlotGet(selectedOption)
      .then((r) => {
        setPayout(r?.data?.data);
        setLoading(false);
        setSortOrder("desc");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setPayout([]);
      });
  }

  function isBeforeStartTime(startDateTime) {
  return Date.now() < new Date(startDateTime).getTime();
  }

  useEffect(() => {
    SpecialSlotData();    
  }, [selectedOption]);

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...payout].sort((a, b) => {
      const dateA = new Date(a.startDateTime);
      const dateB = new Date(b.startDateTime);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortOrder(order);
    setPayout(sortedData);    
  };

  const handlePaymentLink = async(id) => {
    try {
      setPaymentLoading(true);
      const main = new Listing();
      const response = await main.StudentSpecialSlotPaymentLink(id);
      if(response?.data?.status){
        router.push(response?.data?.data?.link);
      }
      else{
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log('error', error);
        toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    setPaymentLoading(false);
  };

  return (
    <StudentLayout page={"Special Slots"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 lg:mb-5">
          <h2 className="capitalize text-lg md:text-xl lg:text-2xl font-bold text-[#55844D] tracking-[-0.04em] font-inter mb-3 md:mb-0">
            Special Slots
          </h2>
          <div className="flex items-center justify-between space-x-3">
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="border border-[#55844D] text-[#55844D] px-1 sm:px-4 py-1.5 rounded-md h-[42px] focus:outline-none"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
        <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto">
          <table className="min-w-full text-sm text-center rounded-[20px]">
            <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
              <tr>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Index
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Lesson Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Teacher Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  <button className="w-full flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                    onClick={() => {
                      handleSort();
                    }} 
                  >
                    Start Time
                    {sortOrder === "desc" ? (
                      <FaArrowDown className="inline-block text-gray-600 text-xs lg:text-sm" />
                    ) : (
                      <FaArrowUp className="inline-block text-gray-600 text-xs lg:text-sm" />
                    )}
                  </button>
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Amount
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Payment status
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">
                  Created At
                </th>
              </tr>
            </thead>
            {loading ? (
              <TableLoader length={5} />
            ) : (
              <tbody>
                {payout && payout?.length > 0 ? (
                  payout?.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[rgba(38,185,27,0.1)] border-t border-[rgba(19,101,16,0.2)]"
                    >
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {index + 1}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.lesson?.title}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.teacher?.name}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {moment(item?.startDateTime).format('DD MMM YYYY, hh:mm A') || ''}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {formatMultiPrice(item?.amount, "USD")}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        <div className="flex justify-center items-center gap-1 whitespace-nowrap">

                          {/* Payment Status */}
                          <div className="flex justify-center items-center gap-2">
                            <span className="capitalize">{item?.paymentStatus}</span>

                            {/* Show Pay button only if pending, before start time, and not cancelled */}
                            {item?.paymentStatus === "pending" &&
                              isBeforeStartTime(item?.startDateTime) &&
                              !item?.cancelled && (
                                <button
                                  onClick={() => handlePaymentLink(item?._id)}
                                  className="text-xs bg-[#55844D] text-white px-2 py-[2px] rounded-md hover:bg-[#3d5e37] transition cursor-pointer"
                                >
                                  {paymentLoading ? "Processing..." : "Pay"}
                                </button>
                              )}
                          </div>

                          {/* Show Cancelled (in red) */}
                          {item?.cancelled && (
                            <span className="text-red-600 text-xs font-semibold">Cancelled</span>
                          )}
                        </div>
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {moment(item?.createdAt).format('DD MMM YYYY, hh:mm A') || ''}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="mt-2">
                        <NoData
                          Heading={"No special slots found."}
                          content={
                            "Your have not created any special slots yet."
                          }
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </StudentLayout>
  );
}