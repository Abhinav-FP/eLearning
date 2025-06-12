import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../common/AdminLayout";
import Image from "next/image";
import Listing from "../../api/Listing";
import Link from "next/link";
import toast from "react-hot-toast";

function TeacherListing() {
  const [tabActive, setTabActive] = useState("existing");
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockloading, setBlockloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const timerRef = useRef(null);

  const handleBlock = async (id) => {
    try {
      setBlockloading(true);
      const main = new Listing();
      const response = await main.userBlock({ id: id });
      if (response?.data) {
        if (response?.data?.data?.block == true) {
          toast.success("Teacher blocked successfully");
        }
        else {
          toast.success("Teacher unblocked successfully");
        }
        fetchData("");
      }
      setBlockloading(false);
    } catch (error) {
      console.log("error", error);
      setBlockloading(false);
    }
  };

  const handleApproveReject = async (id, approve) => {
    try {
      setBlockloading(true);
      const main = new Listing();
      const response = await main.approveRejectTeacher({
        id: id,
        approved: approve
      });
      if (response?.data) {
        if (response?.data?.status) {
          toast.success(response?.data?.message);
        }
        else {
          toast.error(response?.data?.message);
        }
        fetchData("");
      }
      setBlockloading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "An error occured");
      setBlockloading(false);
    }
  };

  const TeacherRow = ({ item, category }) => (
    <tr className={`border-t hover:bg-[rgba(204,40,40,0.1)] border-[rgba(204,40,40,0.2)] ${item?.userId?.block ? "opacity-50" : ""}`}>
      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter text-left">
        <Link href={`/admin/teacher/${item?.userId?._id}`}>
          {item?.userId?.name || ""}
        </Link>
      </td>
      <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter text-left">
        {item?.userId?.email || ""}
      </td>
      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
        {item?.qualifications?.replaceAll("_", " ") || "N/A"}
      </td>
      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
        {item?.experience ? `${item?.experience} years` : "N/A"}
      </td>
      <td className="capitalize px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter">
        <div className="flex gap-2 justify-center items-center">
          {/* <button
            onClick={(()=>{
              setData(item);
              setIsPopupOpen(true);
            })}
            className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
            >
            View 
            </button> */}
          {category === "existing" ?
            <button
              onClick={() => handleBlock(item?.userId?._id)}
              className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
            >
              {blockloading
                ? item?.userId?.block
                  ? "Unblocking"
                  : "Blocking"
                : item?.userId?.block
                  ? "Unblock"
                  : "Block"}
            </button>
            : category === "reject" ?
              <button
                onClick={() => handleApproveReject(item?._id, true)}
                className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
              >
                {blockloading ? "Approving..." : "Approve"}
              </button>
              : category === "new" ?
                <>
                  <button
                    onClick={() => handleApproveReject(item?._id, true)}
                    className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
                  >
                    {blockloading ? "Approving..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleApproveReject(item?._id, false)}
                    className="border border-[#CC2828] text-[#CC2828] hover:bg-[#CC2828] hover:text-white px-3 py-1 text-xs rounded cursor-pointer"
                  >
                    {blockloading ? "Rejecting..." : "Reject"}
                  </button>
                </>
                : <></>
          }
        </div>
      </td>
    </tr>
  );

  const fetchData = async (search) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.adminteacherlist(search);
      if (response?.data) {
        setTeacherData(response?.data?.data || []);
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

  // console.log("teacherData", teacherData);

  const tabs = [
    {
      name: "View existing teachers",
      value: "existing",
    },
    {
      name: "View New teachers",
      value: "new",
    },
    {
      name: "View Rejected teachers",
      value: "reject",
    },
  ];

  return (
    <AdminLayout page={"Teacher Listing"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-wrap gap-5 mb-4 px-3 border-b border-[rgba(0,0,0,.1)]">
          {tabs &&
            tabs?.map((item, index) => (
              <button
                key={index}
                onClick={() => setTabActive(item?.value)}
                className={`text-sm lg:text-lg capitalize font-medium tracking-[-0.04em] px-2 py-3 lg:py-2  cursor-pointer border-b-2 ${tabActive === item?.value
                    ? "text-[#CC2828] border-[#CC2828]"
                    : "text-[#727272] border-transparent"
                  }`}
              >
                {item?.name}
              </button>
            ))}
        </div>
        <div className="relative mb-6 md:mb-10 w-full md:w-auto">
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search By Name"
            className="w-full rounded-[10px] border border-[rgba(0,0,0,0.1)] text-[#595959] text-sm tracking-[-0.03em] pl-12 pr-4 bg-[rgba(204,40,40,0.1)] outline-0 h-[44px]"
          />
          <Image
            src="/search-icon.png"
            width={20}
            height={20}
            alt="search icon"
            className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
        <div>
          <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
            <table className="min-w-full text-sm text-center rounded-[20px]">
              <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                <tr>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize text-left">
                    Teacher name
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize text-left">
                    Email
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Qualification
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Experience
                  </th>
                  <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                    Action
                  </th>
                </tr>
              </thead>
              {tabActive === "existing" && (
                <tbody>
                  {teacherData &&
                    teacherData?.approvedTeachers &&
                    teacherData?.approvedTeachers?.map((item, index) => (
                      <TeacherRow key={index} item={item} category={"existing"} />
                    ))}
                </tbody>
              )}
              {tabActive === "new" && (
                <tbody>
                  {teacherData &&
                    teacherData?.pendingApproval &&
                    teacherData?.pendingApproval?.map((item, index) => (
                      <TeacherRow key={index} item={item} category={"new"} />
                    ))}
                </tbody>
              )}
              {tabActive === "reject" && (
                <tbody>
                  {teacherData &&
                    teacherData?.rejectedTeachers &&
                    teacherData?.rejectedTeachers?.map((item, index) => (
                      <TeacherRow key={index} item={item} category={"reject"} />
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default TeacherListing;
