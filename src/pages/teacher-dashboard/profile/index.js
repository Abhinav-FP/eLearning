import React, { useEffect, useState } from "react";
import TeacherLayout from "../Common/TeacherLayout";
import { MdEditSquare } from "react-icons/md";
import AddLesson from "./AddLesson";
import Listing from "@/pages/api/Listing";

export default function Index() {
  const [data, setData]=useState([]);
  const [editData, setEditData]=useState(null);
  const [isLessonOpen, setIsLessonOpen] = useState(false);
  const closeLesson = () => setIsLessonOpen(false);

  const getLessons=()=>{
    const main = new Listing();
    main.TeacherLessonGet()
      .then((r) => {
        console.log("r",r?.data);
        setData(r?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getLessons();
  }, []);

  const handleEdit=(item)=>{
    setEditData(item);
    setIsLessonOpen(true);    
  }

  const LessonCard = ({item}) => {
    return (
      <div className="bg-white shadow-md rounded-2xl flex justify-between items-center p-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#CC2828]">{item?.title || ""}</h3>
            <MdEditSquare size={16} className="text-[#CC2828] cursor-pointer" onClick={()=>{handleEdit(item)}}/>
          </div>
          <div className="flex items-center text-yellow-400 text-sm mt-1">
            ★★★★☆ (29)
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {item?.description || ""}
          </p>
        </div>
        <div className="text-center sm:text-right">
          <div className="bg-red-100 text-[#CC2828] font-bold p-2 rounded-full">
            {item?.price ? `USD $${item?.price}` : ""}
          </div>
        </div>
      </div>
    );
  };

  return (
    <TeacherLayout page={"Profile"}>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <h1 className="font-inter text-lg lg:text-2xl xl:text-3xl font-bold text-[#CC2828] mb-6">Edit Profile</h1>
        <div className="bg-red-100 p-6 rounded-2xl flex flex-col justify-between items-start relative">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold text-[#CC2828]">James Smith</h2>
              <p className="text-[#46494D] text-sm">Teacher</p>
            </div>
          </div>

          {/* Edit Button */}
          <button className="absolute top-[67px] sm:top-10 right-1 sm:right-4 bg-[#CC2828] hover:bg-[#941111fd] text-white text-sm px-4 py-1.5 rounded cursor-pointer">
            Edit Profile
          </button>

          {/* Info Grid */}
          <div className="w-full mt-10 mb-2 flex flex-wrap gap-x-10 gap-y-2 md:justify-center text-sm">
            <p>
              <span className="font-semibold text-red-500">Nationality:</span>{" "}
              Japanese
            </p>
            <p>
              <span className="font-semibold text-red-500">Gender:</span> Male
            </p>
            <p>
              <span className="font-semibold text-red-500">
                Language spoken:
              </span>{" "}
              Japanese, English
            </p>
            <p>
              <span className="font-semibold text-red-500">Interests:</span>{" "}
              Writing / Blogging
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-red-700 mb-4">Lessons</h2>
          <div className="space-y-4">
            {data && data?.map((item,index)=>(
              <LessonCard key={index} item={item} />
            ))}
          </div>

          {/* <div className=" mt-6"> */}
            <button className="bg-[#CC2828] hover:bg-red-600 mt-6 text-white px-8 py-3 rounded font-bold cursor-pointer"
            onClick={()=>{
              setEditData(null);
              setIsLessonOpen(true);
            }}>
              Add Lesson
            </button>
          {/* </div> */}
        </section>
      </div>
      <AddLesson
        isOpen={isLessonOpen}
        onClose={closeLesson}
        data={editData}
        getLessons={getLessons}
      />
    </TeacherLayout>
  );
}