import React, { useEffect, useState } from "react";
import TeacherLayout from "../Common/TeacherLayout";
import { MdEditSquare } from "react-icons/md";
import AddLesson from "./AddLesson";
import Listing from "@/pages/api/Listing";
import { RiDeleteBin6Line } from "react-icons/ri";
import Delete from "./Delete";
import Link from "next/link";
import { EditProfileLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";
import ViewLesson from "@/pages/common/ViewLesson";
import toast from "react-hot-toast";
import { FaUndo, FaEdit } from 'react-icons/fa'; // Delete and Restore icons

export default function Index() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [isLessonOpen, setIsLessonOpen] = useState(false);
  const closeLesson = () => setIsLessonOpen(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const closeDelete = () => setIsDeleteOpen(false);

  const getLessons = () => {
    setLoading(true);
    const main = new Listing();
    main.TeacherLessonGet()
      .then((r) => {
        setData(r?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const keyMappings = {
    M: "Male",
    F: "Female",
    O: "Other",
  };

  useEffect(() => {
    getLessons();
  }, []);

  const handleEdit = (item) => {
    setEditData(item);
    setIsLessonOpen(true);
  }

  const handleIsDelete = (item) => {
    const main = new Listing();
    const response = main.TeacherDelete({
      _id: item?._id,
      status: false
    });
    response.then((res) => {
      toast.success(res.data.message)
      getLessons();
    }).catch((error) => {
      console.log("erorr", error)
    })
  }
  const [isOpen, setIsOpen] = useState(false);
  const [Lesson, setLesson] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect( () => {
     const handleReSize = () => {
      setIsMobile(window.innerWidth < 767)
     };
     handleReSize();
     window.addEventListener('resize', handleReSize);
     return () => window.removeEventListener('resize', handleReSize);
  }, []);

  const LessonCard = ({ item, datalesson }) => {
    return (
      <div className={`${item?.
        is_deleted === true ? "bg-gray-200" : "bg-white"} lesson_list_shadow rounded-2xl flex flex-col md:flex-row gap-8 justify-between items-start md:items-center p-4 lg:px-5 lg:py-6 mb-3 lg:mb-4 `}>
        <div className="flex-1 cursor-pointer" >
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-semibold text-[#33403D] tracking-[-0.04em] capitalize">{item?.title || ""}</h3>
            {item?.
              is_deleted === true ? (
              <FaUndo size={18} title="Enable" className="text-[#55844D] cursor-pointer" onClick={() => { handleIsDelete(item) }} />
            ) : (
              <>
                <MdEditSquare size={18} title="Edit" className="text-[#55844D] cursor-pointer" onClick={() => { handleEdit(item) }} />
                <RiDeleteBin6Line size={17} title="Disable" className="text-[#CC2828] hover:text-[#ad0e0e] cursor-pointer"
                  onClick={() => {
                    setId(item?._id);
                    setIsDeleteOpen(true);
                  }}
                />
              </>
            )}
          </div>
          {/* <div className="flex items-center text-[#E4B750] text-lg mt-2">
            ★★★★☆ <span className="text-black tracking-[-0.04em] text-xs font-medium">(29)</span>
          </div> */}
          <div className="mb-3 md:mb-0 w-full md:w-[calc(100%-170px)] md:pr-5">
            <span className="text-base text-[#55844D]
                     bg-[#FAF9F6] font-medium tracking-[-0.04em] 
                     px-5 leading-[40px] py-1 rounded-full line-clamp-1 overflow-hidden" onClick={datalesson} >
              {item?.description}
            </span>
          </div>
        </div>
        <div className="text-center sm:text-right ">
          <div className="bg-[#FAF9F6] tracking-[-0.04em] text-center text-sm lg:text-base text-[#55844D] font-semibold capitalize min-w-[119px] md:min-w-[149px] px-2 py-2 rounded-full">
            {item?.price && item?.duration
              ? `${formatMultiPrice(item?.price, "USD")}/${item?.duration} min` : ""}
          </div>
        </div>

      </div>
    );
  };


  return (
    <TeacherLayout page={"Profile & Lessons"}>
      {loading ?
        <EditProfileLoader />
        :
        <div className="min-h-screen p-5 lg:p-[30px]">
          <h1 className="ont-inter text-lg lg:text-2xl font-bold text-[#55844D] tracking-[-0.04em] mb-6">Edit Profile</h1>
          <div className="bg-[#FAF9F6] p-4 md:p-6 lg:p-8 rounded-2xl  items-start relative">
            <div className="flex w-full pr-8 md:pr-0 relative md:items-center flex-col gap-3 md:flex-row justify-between ">
              {/* Profile Section */}
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <img
                  src={data?.profile?.userId?.profile_photo || "/Placeholder.png"}
                  alt="Profile"
                  className="w-16 h-16 lg:w-[94px] lg:h-[94px] rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-[#55844D] tracking-[-0.04em] md:mb-1">{data?.profile?.userId?.name || ""}</h2>
                  <p className="text-[#46494D] text-sm lg:text-base font-medium tracking-[-0.03em] mb-0">Teacher</p>
                </div>
              </div>
              {/* Edit Button */}
              {isMobile ? (
                <Link href="/teacher-dashboard/setting" className="text-[#55844D] cursor-pointer absolute right-0 top-1">
                  <FaEdit size={18} />
              </Link>
              )
              :
              (
                
               <Link href="/teacher-dashboard/setting" className="bg-[#55844D] hover:bg-[#3d5e37] tracking-[-0.03em] text-white text-sm px-3 md:px-4  py-1.5 md:py-2.5 rounded-[6px] cursor-pointer ">
                Edit Profile
                </Link>
              )

              }
              
            </div>

            {/* Info Grid */}
            <div className="w-full mt-4 md:mt-8 lg:mt-10 mb-2 flex flex-wrap gap-x-4 lg:gap-x-10 gap-y-2 text-sm">
              <p className="text-sm lg:text-base text-black tracking-[-0.04em]">
                <span className="font-normal text-[#55844D]">Nationality:</span>{" "}
                {data?.profile?.userId?.nationality || "N/A"}
              </p>
              <p>
                <span className="font-normal text-[#55844D]">Gender:</span> {keyMappings[data?.profile?.gender] || "N/A"}
              </p>
              <p className="text-sm lg:text-base text-black tracking-[-0.04em]">
                <span className="font-normal text-[#55844D]">
                  Language spoken:
                </span>{" "}
                {data?.profile?.languages_spoken?.join(", ") || "N/A"}
              </p>
              <p className="text-sm lg:text-base text-black tracking-[-0.04em]">
                <span className="font-normal text-[#55844D]">
                  Specialities:
                </span>{" "}
                {data?.profile?.tags?.join(", ") || "N/A"}
              </p>
              {/* <p className="text-sm lg:text-base text-black tracking-[-0.04em]">
                <span className="font-normal text-[#55844D]">Experience:</span>{" "}
                {data?.profile?.experience ? `${data?.profile?.experience} years` : "N/A"}
              </p> */}
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-[#55844D] mb-4">Lessons</h2>
            {data && data?.lessons?.length > 0 ?
              <div className="space-y-4">
                {data && data?.lessons && data?.lessons?.map((item, index) => (
                  <LessonCard key={index} item={item}
                    datalesson={() => {
                      setLesson(item);
                      setIsOpen(true);
                    }}
                  />
                ))}
              </div> :
              <NoData Heading={"No lessons found."} content={"Add some lessons to view them here"} />
            }
            <button className="bg-[#55844D] tracking-[-0.04em] text-base mt-4 lg:mt-6 hover:bg-[#3d5e37] mt-6 text-white px-6 lg:px-10 py-3 lg:py-3.5 rounded-[10px] font-bold cursor-pointer"
              onClick={() => {
                setEditData(null);
                setIsLessonOpen(true);
              }}>
              Add Lesson
            </button>
            {/* </div> */}
          </section>
        </div>}
      <AddLesson
        isOpen={isLessonOpen}
        onClose={closeLesson}
        data={editData}
        getLessons={getLessons}
      />

      <Delete
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        getLessons={getLessons}
        Id={id}
      />

      {isOpen && Lesson && (
        <ViewLesson
          title={Lesson.title}
          description={Lesson.description}
          price={Lesson.price}
          duration={Lesson.duration}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

    </TeacherLayout>
  );
}