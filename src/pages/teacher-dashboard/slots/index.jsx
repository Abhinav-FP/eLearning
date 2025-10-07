import React, { useEffect, useRef, useState } from 'react'
import TeacherLayout from '../Common/TeacherLayout'
import NoData from '@/pages/common/NoData';
import { TableLoader } from '@/components/Loader';
import Listing from '@/pages/api/Listing';
import AddSlot from './AddSlot';
import { formatMultiPrice } from '@/components/ValueDataHook';
import moment from 'moment';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function Iindex() {
  const [payout, setPayout] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const timerRef = useRef(null);

  const closePopup = () => setIsPopupOpen(false);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const SpecialSlotData = async(search="") => {
    setLoading(true);
    const main = new Listing();
    main
      .SpecialSlotGet(selectedOption, search)
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

  const handleSearchChange = (e) => {
    const sval = e.target.value;
    setSearchText(sval);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!sval || sval.trim() === "") {
      timerRef.current = setTimeout(() => {
        SpecialSlotData(sval);
      }, 1500);
    } else if (sval.length >= 2) {
      timerRef.current = setTimeout(() => {
        SpecialSlotData(sval);
      }, 1500);
    }
  };

  return (
    <TeacherLayout page={"Special Slots"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 lg:mb-5">
          {/* <h2 className="capitalize text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter mb-3 md:mb-0">
            Special Slots
          </h2> */}
          <div className="w-full mb-4 md:mb-0 md:w-1/3 md:max-w-sm relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#888]"/>
            </span>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search by student name"
              className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CC2828] placeholder-gray-400"
            />
          </div>
          <div className="flex items-center justify-between space-x-3">
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="border border-[#CC2828] text-[#CC2828] px-1 sm:px-4 py-1.5 rounded-md h-[42px] focus:outline-none"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <button
              onClick={() => {
                setIsPopupOpen(true);
              }}
              className="w-fit px-2 sm:px-8 py-2.5 hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-md h-[42px] tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
            >
              Add Special Slot
            </button>
          </div>
        </div>
        <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
          <table className="min-w-full text-sm text-center rounded-[20px]">
            <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
              <tr>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Index
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Lesson Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Student Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
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
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Amount
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Payment status
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
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
                      className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                    >
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {index + 1}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.lesson?.title}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.student?.name}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {moment(item?.startDateTime).format('DD MMM YYYY, hh:mm A') || ''}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {formatMultiPrice(item?.amount, "USD")}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.paymentStatus}
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
      <AddSlot
        isOpen={isPopupOpen}
        onClose={closePopup}
        SpecialSlotData={SpecialSlotData}
      />
    </TeacherLayout>
  );
}
