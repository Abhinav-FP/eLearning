import React, { useEffect, useState } from "react";
import AdminLayout from "../common/AdminLayout";
import Image from "next/image";
import { FaUndo, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddCourse from "./AddCourse";
import Listing from "@/pages/api/Listing";
import DeleteCourse from "./DeleteCourse";
import toast from "react-hot-toast";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const closeDeletePopup = () => setIsDeleteOpen(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      // setLoading(true);
      const main = new Listing();
      const response = await main.AdminCourseGet();
      if (response.data) {
        setData(response.data.data);
      }
      // setLoading(false);
    } catch (error) {
      console.log("error", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const enableCourse = (Id) => {
    const main = new Listing();
    main
      .AdminCourseDelete(Id)
      .then((r) => {
        toast.success(r?.data?.message);
        fetchData();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log("error", err);
      });
  };

  return (
    <AdminLayout page={"Courses"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 lg:mb-5">
          <h1 className="font-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-6">
            Manage Courses
          </h1>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="w-fit px-2 sm:px-8 h-[44px] py-2 hover:bg-white hover:text-[#CC2828] border border-[#CC2828] rounded-md tracking-[-0.06em] text-sm font-medium bg-[#CC2828] text-white cursor-pointer"
          >
            Add Course
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            data?.map((item, index) => (
              <div
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 
          ${item?.is_deleted ? "opacity-80" : ""}
          border border-gray-100 max-w-sm`}
                key={index}
              >
                <div className="relative">
                  <Image
                    src={item?.thumbnail || "/Placeholder.png"}
                    alt={item?.title}
                    width={400}
                    height={250}
                    className="w-full h-[220px] object-cover"
                  />
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedCourse(item);
                    }}
                    className="absolute top-2 left-2 bg-white bg-opacity-80 hover:bg-[#CC2828] hover:text-white text-[#CC2828] p-2 rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  {item?.is_deleted ? (
                    <button
                      onClick={() => {
                        enableCourse(item?._id);
                      }}
                      className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-[#CC2828] hover:text-white text-[#CC2828] p-2 rounded-full shadow-sm transition-all cursor-pointer"
                    >
                      <FaUndo className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setSelectedCourse(item);
                      }}
                      className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-[#CC2828] hover:text-white text-[#CC2828] p-2 rounded-full shadow-sm transition-all cursor-pointer"
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-black text-lg font-semibold">
                    {item?.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {item?.description}
                  </p>
                  <a
                    href={item?.link}
                    target="blank"
                    className="block text-center w-full py-2.5 rounded-full bg-[#CC2828] hover:bg-[#ad0e0e] text-white font-semibold transition-all"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <AddCourse
        isOpen={isOpen}
        onClose={closePopup}
        data={selectedCourse}
        fetchData={fetchData}
      />
      <DeleteCourse
        isOpen={isDeleteOpen}
        onClose={closeDeletePopup}
        Id={selectedCourse?._id}
        fetchData={fetchData}
      />
    </AdminLayout>
  );
}
