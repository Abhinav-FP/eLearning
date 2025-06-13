import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../common/AdminLayout";
import Image from "next/image";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import ViewPopup from "./ViewPopup";
import { FiSearch } from "react-icons/fi";
import NoData from "@/pages/common/NoData";
import { TableLoader } from "@/components/Loader";

function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockloading, setBlockloading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const closePopup = () => setIsPopupOpen(false);
  const [item, setItem] = useState(null);
  const timerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    fetchData("");
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    // console.log("Selected Option:", e.target.value);
    fetchData(searchQuery, e.target.value);
  };



  // console.log("data", data);

  return (
    <AdminLayout page={"Students Listing"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 md:mb-10 w-full">
          <div className="w-1/3 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#CC2828]" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search by name or email"
              className="w-full pl-10 pr-4 py-2 border border-[#CC2828] text-[#CC2828] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CC2828] placeholder-gray-400"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              name="filter"
              value={selectedOption}
              onChange={handleSelectChange}
              className="border border-[#CC2828] text-[#CC2828] px-3 py-2 rounded-md focus:outline-none"
            >
              <option value="">All</option>
              <option value="true">Blocked</option>
              <option value="false">Unblocked</option>
            </select>
          </div>

        </div>

        <div className="border-t border-[rgba(0,0,0,.1)] pt-3 md:pt-4 lg:pt-6 overflow-x-auto">
          <table className="min-w-full text-sm text-center rounded-[20px]">
            <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
              <tr>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize text-left">Name</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Email</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Phone</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Timezone</th>
                <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">Action</th>
              </tr>
            </thead>

            {loading ? (
              <TableLoader length={5} />
            ) : (
              <tbody>
                {data?.length > 0 ? (
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-t hover:bg-[rgba(204,40,40,0.1)] border-[rgba(204,40,40,0.2)] ${item?.block ? "opacity-50" : ""}`}
                    >
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter text-left">
                        {item?.name || "N/A"}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {item?.email || "N/A"}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {item?.phone || "N/A"}
                      </td>
                      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        {item?.time_zone || "N/A"}
                      </td>
                      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
                        <div className="flex gap-2 justify-center items-center">
                          <button
                            onClick={() => {
                              setItem(item);
                              setIsPopupOpen(true);
                            }}
                            className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleBlock(item?._id)}
                            className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
                          >
                            {blockloading
                              ? item?.block
                                ? "Unblocking"
                                : "Blocking"
                              : item?.block
                                ? "Unblock"
                                : "Block"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      <NoData
                        heading="No rejected teachers found."
                        content="If any teachers are rejected, they will be listed here for your reference."
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
        isOpen={isPopupOpen}
        onClose={closePopup}
        data={item}
      />
    </AdminLayout>
  );
}

export default Index;
