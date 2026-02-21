import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../common/AdminLayout";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import ViewPopup from "./ViewPopup";
import { FiSearch } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";
import { FiSlash } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import NoData from "@/pages/common/NoData";
import { TableLoader } from "@/components/Loader";
import { useRouter } from "next/router";
import { useRole } from "@/context/RoleContext";
import * as XLSX from 'xlsx';

function Index() {
  const router = useRouter();
  const { user, setUser } = useRole();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockloading, setBlockloading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const closePopup = () => setIsPopupOpen(false);
  const [item, setItem] = useState(null);
  const timerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const timezoneMappings = {
    "Asia/Tokyo": "Japan (JST) (GMT+9)",
    "America/New_York": "New York (Eastern Time) (GMT-4)",
    "America/Denver": "Denver (Mountain Time) (GMT-6)",
    "America/Chicago": "Chicago (Central Time) (GMT-5)",
    "America/Los_Angeles": "Los Angeles (Pacific Time) (GMT-7)",
    "Europe/London": "London (GMT) (GMT+1)",
    "Europe/Berlin": "Berlin (CET) (GMT+2)",
    "Europe/Kyiv": "Kyiv (EET) (GMT+3)",
    "Asia/Kolkata": "India (IST) (GMT+5.5)",
    "Asia/Shanghai": "China (CST) (GMT+8)",
    "Asia/Seoul": "Korea (KST) (GMT+9)",
    "Australia/Sydney": "Sydney (AEST) (GMT+10)",
    "Pacific/Auckland": "New Zealand (NZST) (GMT+12)",
    "Asia/Singapore": "Singapore (SGT) (GMT+8)",
    "America/Sao_Paulo": "Brazil (BRT) (GMT-3)",
    "America/Argentina/Buenos_Aires": "Argentina (ART) (GMT-3)",
    "America/Anchorage": "Alaska (AKST) (GMT-8)",
    "Pacific/Honolulu": "Hawaii (HAST) (GMT-10)",
    "Europe/Moscow": "Moscow (MSK) (GMT+3)",
    "America/Halifax": "Atlantic (AST) (GMT-3)"
  };

  const handleBlock = async (id) => {
    try {
      setBlockloading(true);
      const main = new Listing();
      const response = await main.userBlock({ id: id });
      if (response?.data) {
        if (response?.data?.data?.block == true) {
          toast.success("Student blocked successfully");
        }
        else {
          toast.success("Student unblocked successfully");
        }
        fetchData();
      }
      setBlockloading(false);
    } catch (error) {
      console.log("error", error);
      setBlockloading(false);
    }
  };

  const handleEmulate = async (id) => {
    try {
      const main = new Listing();
      const response = await main.userEmulate(id);
      if (!response?.data?.status) {
        toast.error(response?.data?.message);
        return;
      }
      const { token, message } = response.data;
      const adminToken = localStorage.getItem("token");
      if (adminToken) {
        localStorage && localStorage.setItem("admintoken", adminToken);
      }
      localStorage && localStorage.setItem("token", token);
      toast.success(message || "Emulation successful");
      setUser(null);
      router.push("/student");
    } catch (error) {
      console.error("Emulation error:", error);
      toast.error(error?.response?.data?.message || "An unknown error occurred");
    }
  };

  const fetchData = async (search = "", filter = "") => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.adminStudentList(search, filter);
      if (response?.data) {
        setData(response?.data?.data || []);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const sval = e.target.value;
    setSearchQuery(sval);
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

  const downloadExcel = () => {
    if (!data || data.length === 0) {
      toast.error("No data to export");
      return;
    }
    const result = data && data?.map(item => ({
      "Email": item?.email || "",
      "Name": item?.name || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "Students.xlsx");
  };

  useEffect(() => {
    fetchData("");
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    fetchData(searchQuery, e.target.value);
  };

  return (
    <AdminLayout page={"Students Listing"}>
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
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search by name or email"
                className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#ddd] text-[#000] rounded-md focus:outline-none focus:ring-1 focus:ring-[#55844D] placeholder-gray-400"
              />
            </div>

            {/* RIGHT: Filter + Export */}
            <div className="flex w-full gap-3 md:w-auto md:justify-end">
              <select
                name="filter"
                value={selectedOption}
                onChange={handleSelectChange}
                className="w-full md:w-auto h-[44px] border border-[#ddd] text-[#000] px-3 rounded-md focus:outline-none"
              >
                <option value="">All</option>
                <option value="true">Blocked</option>
                <option value="false">Unblocked</option>
              </select>

              <button
                onClick={downloadExcel}
                className="w-full md:w-auto h-[44px] px-4 xl:px-8 bg-[#55844D] text-white border border-[#55844D] rounded-md text-sm font-medium tracking-[-0.06em] hover:bg-white hover:text-[#55844D] transition cursor-pointer"
              >
                Export Emails
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-[5px] border border-[rgba(19,101,16,0.3)] overflow-x-auto">
          <table className="min-w-full text-sm text-center rounded-[20px]">
            <thead className="bg-[rgba(38,185,27,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
              <tr>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize text-left">Name</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize text-left">Email</th>
                {/* <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">Phone</th> */}
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">Timezone</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(19,101,16,0.2)] capitalize">Action</th>
              </tr>
            </thead>

            {loading ? (
              <TableLoader length={4} />
            ) : (
              <tbody>
                {data?.length > 0 ? (
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-t hover:bg-[rgba(38,185,27,0.1)] border-[rgba(19,101,16,0.2)] ${item?.block ? "opacity-50" : ""}`}
                    >
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter text-left">
                        {item?.name || "N/A"}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter text-left">
                        {item?.email || "N/A"}
                      </td>
                      {/* <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {item?.phone || "N/A"}
                      </td> */}
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {timezoneMappings[item?.time_zone] || "N/A"}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        <div className="flex gap-2 justify-center items-center">
                          <button
                            onClick={() => {
                              setItem(item);
                              setIsPopupOpen(true);
                            }}
                            title="View details"
                            className="p-2 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition cursor-pointer"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            onClick={() => handleEmulate(item?._id)}
                            title="Emulate user"
                            className="p-2 rounded hover:bg-gray-100 text-gray-600 hover:text-black transition cursor-pointer"
                          >
                            <FiUserCheck size={16} />
                          </button>
                          <button
                            onClick={() => handleBlock(item?._id)}
                            title={item?.block ? "Unblock user" : "Block user"}
                              className={`p-2 rounded transition cursor-pointer
                                ${item?.block
                                  ? "text-green-600 hover:bg-green-100"
                                  : "text-red-600 hover:bg-red-100"
                                }`}
                            >
                              <FiSlash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">
                      <NoData
                        Heading={`No student found with the selected filters`}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            )}


          </table>
        </div>

      </div>
      <ViewPopup
        timezoneMappings={timezoneMappings}
        isOpen={isPopupOpen}
        onClose={closePopup}
        data={item}
      />
    </AdminLayout>
  );
}

export default Index;
