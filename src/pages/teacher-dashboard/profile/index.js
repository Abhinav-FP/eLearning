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
        // console.log("r", r?.data);
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

  const LessonCard = ({ item }) => {
    return (
      <div className="bg-white lesson_list_shadow rounded-2xl flex flex-col md:flex-row gap-3 justify-between items-start md:items-center p-4 lg:px-5 lg:py-6 mb-3 lg:mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#CC2828] tracking-[-0.04em] capitalize">{item?.title || ""}</h3>
            <MdEditSquare size={18} className="text-[#CC2828] cursor-pointer" onClick={() => { handleEdit(item) }} />
            <RiDeleteBin6Line size={17} className="text-red-600 hover:text-red-700 cursor-pointer"
              onClick={() => {
                setId(item?._id);
                setIsDeleteOpen(true);
              }}
            />
          </div>
          <div className="flex items-center text-[#E4B750] text-lg mt-2">
            ★★★★☆ <span className="text-black tracking-[-0.04em] text-xs font-medium">(29)</span>
          </div>
          <p className="text-xs text-[#CC2828] bg-[rgba(204,40,40,0.1)] mt-2 font-medium tracking-[-0.04em] px-2 py-1 rounded-full">
            {item?.description || ""}
          </p>
        </div>
        <div className="text-center sm:text-right">
          <div className="bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-center text-sm lg:text-base text-[#CC2828] font-semibold capitalize min-w-[119px] md:min-w-[149px] px-2 py-2 rounded-full">
            {item?.price ? `USD $${item?.price}` : ""}
          </div>
        </div>
      </div>
    );
  };

  return (
    <TeacherLayout page={"Profile"}>
      {loading ? 
      <EditProfileLoader/>
      :
      <div className="min-h-screen p-5 lg:p-[30px]">
        <h1 className="ont-inter text-lg lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] mb-6">Edit Profile</h1>
        <div className="bg-red-100 p-4 md:p-6 lg:p-8 rounded-2xl  items-start relative">
          <div className="flex items-center flex-col gap-3 md:flex-row justify-between ">
            {/* Profile Section */}
            <div className="flex flex-row items-center gap-3 lg:gap-4">
              <img
                src={data?.profile?.userId?.profile_photo || "/profile.png"}
                alt="Profile"
                className="w-16 h-16 lg:w-[94px] lg:h-[94px] rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-[#CC2828] tracking-[-0.04em] md:mb-1">{data?.profile?.userId?.name || ""}</h2>
                <p className="text-[#46494D] text-sm lg:text-base font-medium tracking-[-0.03em] mb-0">Teacher</p>
              </div>
            </div>
            {/* Edit Button */}
            <Link href="/teacher-dashboard/setting" className="bg-[#CC2828] hover:bg-[#941111fd] tracking-[-0.03em] text-white text-sm px-3 md:px-4  py-1.5 md:py-2.5 rounded-[6px] cursor-pointer">
              Edit Profile
            </Link>
          </div>

          {/* Info Grid */}
          <div className="w-full mt-6 md:mt-8 lg:mt-10 mb-2 flex flex-wrap gap-x-4 lg:gap-x-10 gap-y-2 text-sm">
            <p className="text-sm lg:text-base text-black tracking-[-0.04em]">
              <span className="font-normal text-[#CC2828]">Nationality:</span>{" "}
              {data?.profile?.userId?.nationality || "N/A"}
            </p>
            <p>
              <span className="font-normal text-[#CC2828]">Gender:</span> {keyMappings[data?.profile?.gender] || "N/A"}
            </p>
            <p className="text-sm lg:text-base text-black tracking-[-0.04em]">
              <span className="font-normal text-[#CC2828]">
                Language spoken:
              </span>{" "}
              {data?.profile?.languages_spoken?.join(", ") || "N/A"}
            </p>
            <p className="text-sm lg:text-base text-black tracking-[-0.04em]">
              <span className="font-normal text-[#CC2828]">Experience:</span>{" "}
              {data?.profile?.experience ? `${data?.profile?.experience} years` : "N/A"}
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-red-700 mb-4">Lessons</h2>
          {data && data?.lessons?.length >0 ?
          <div className="space-y-4">
            {data && data?.lessons && data?.lessons?.map((item, index) => (
              <LessonCard key={index} item={item} />
            ))}
          </div> :
          <NoData Heading={"No lessons found."} content={"Add some lessons to view them here"}/>
          }
          {/* <div className=" mt-6"> */}
          <button className="bg-[#CC2828] tracking-[-0.04em] text-base mt-4 lg:mt-6 hover:bg-[#941111fd] mt-6 text-white px-6 lg:px-10 py-3 lg:py-3.5 rounded-[10px] font-bold cursor-pointer"
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
    </TeacherLayout>
  );
}