import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../common/AdminLayout';
import NoData from '@/pages/common/NoData';
import { TableLoader } from '@/components/Loader';
import { IoInformationCircleOutline } from "react-icons/io5";
import Listing from '@/pages/api/Listing';
import moment from 'moment';
import ApproveRejectPopup from './ApproveRejectPopup';
import BankDetailPopup from './BankDetailPopup';
import { FiSearch } from "react-icons/fi";
import Link from 'next/link';

export default function Index() {
  const [payout, setPayout] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const closeApprovePopup = () => setIsApprovePopupOpen(false);
  const [actionType, setActionType] = useState("approved");
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const timerRef = useRef(null);
  const [isBankPopupOpen, setIsBankPopupOpen] = useState(false);
  const closeBankPopup = () => setIsBankPopupOpen(false);

  const fetchData = (search = "") => {
    setLoading(true);
    const main = new Listing();
    main
      .AdminPayoutList(search, selectedOption)
      .then((r) => {
        setPayout(r?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setPayout([]);
      });
  }

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const handleSearchChange = (e) => {
    const sval = e.target.value;
    setSearchText(sval);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!sval || sval.trim() === "") {
      timerRef.current = setTimeout(() => {
        fetchData(sval);
      }, 1500);
    } else if (sval.length >= 2) {
      timerRef.current = setTimeout(() => {
        fetchData(sval);
      }, 1500);
    }
  };


  return (
    <AdminLayout page={"Payouts"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="md:flex flex-wrap justify-between items-center mb-4 lg:mb-5">
          {/* Heading aligned left */}
          <h2 className="capitalize text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter mb-3 md:mb-0">
            Payout Requests
          </h2>

          {/* Filters aligned right */}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-[#888]" />
              </span>
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search using teacher name"
                className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CC2828] placeholder-gray-400"
              />
            </div>

            {/* Dropdown Filter */}
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="w-full md:w-auto border border-[#ddd] h-[44px] text-[#000] px-2 sm:px-3 xl:px-4 py-2 mb-4 md:mb-0  rounded-md focus:outline-none"
            >
              <option value="">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
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
                  Teacher Name
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Amount
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Bank Details
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Request Time
                </th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                  Action
                </th>
              </tr>
            </thead>
            {loading ? (
              <TableLoader length={6} />
            ) : (
              <tbody>
                {payout && payout?.length > 0 ? (
                  payout?.map((item, index) => (
                    <tr key={index} className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]" >
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {index + 1}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap ">
                        <Link href={`/admin/teacher/${item?.userId?._id}`}>{item?.userId?.name}</Link>
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        ${item?.amount}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter text-center whitespace-nowrap">
                        <button className="flex items-center justify-center gap-1 mx-auto cursor-pointer"
                          onClick={() => {
                            setData(item?.BankId);
                            setIsBankPopupOpen(true);
                          }}>
                          View <IoInformationCircleOutline size={18} />
                        </button>
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter whitespace-nowrap">
                        {moment(item?.createdAt).format("MMMM D, YYYY h:mm A")}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                        {item?.Status === "pending" ?
                          <div className="flex gap-2 justify-center items-center">
                            <button
                              onClick={(() => {
                                setActionType("approved");
                                setSelectedId(item?._id);
                                setIsApprovePopupOpen(true);
                              })}
                              className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={(() => {
                                setActionType("rejected");
                                setSelectedId(item?._id);
                                setIsApprovePopupOpen(true);
                              })}
                              className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                          :
                          <>
                            {item?.Status}
                          </>
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="mt-2">
                        <NoData
                          Heading={"No Payouts found"}
                          content={
                            "No payout request found."
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
      <ApproveRejectPopup
        isOpen={isApprovePopupOpen}
        onClose={closeApprovePopup}
        actionKey={actionType}
        id={selectedId}
        fetchData={fetchData}
      />
      <BankDetailPopup
        isOpen={isBankPopupOpen}
        onClose={closeBankPopup}
        data={data}
      />
    </AdminLayout>
  )
};