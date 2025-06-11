import React, { useEffect, useState } from "react";
import NoData from "../common/NoData";
import { useRouter } from "next/router";
import { formatMultiPrice } from "@/components/ValueDataHook";
import ViewLesson from "../common/ViewLesson";
import { LessonListLoader } from "@/components/Loader";


export default function LessonList({ lessons, showSelected, selectedLesson, SetSelectedLesson, slug, loading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Lesson, setLesson] = useState(null);
  const router = useRouter();
  return (
    <>
      {
        loading ?
        <LessonListLoader rows={3}/>
        :
      (lessons && lessons?.length > 0 ?
        <ul className="space-y-5 lg:space-y-5">
          {lessons?.map((item, index) => (
            <li
              key={index}
              className={`bg-white rounded-[10px] ${showSelected && selectedLesson?._id == item?._id ? "border border-[#CC2828]" : "border border-white"} lg:rounded-[20px] p-5 lg:p-6 xl:p-10 cursor-pointer`}
              onClick={() => {
                if(!showSelected){
                setLesson(item);
                setIsOpen(true);}
                else{
                  SetSelectedLesson(item);
                }
              }}
            >
              <h3 className="text-[#CC2828] tracking-[-0.04em] text-xl lg:text-2xl xl:text-[30px] font-inter font-extrabold mb-3 md:mb-3 lg:mb-3 capitalize">
                {item?.title} - {item?.duration} minutes
              </h3>
              <div className="flex flex-wrap ">
                <div className="mb-3 md:mb-0 w-full md:w-[calc(100%-170px)] md:pr-5">
                  <span className="text-base text-[#CC2828]
                     bg-[rgba(204,40,40,0.1)] font-medium tracking-[-0.04em] 
                     px-5 leading-[40px] py-1 rounded-full line-clamp-1 overflow-hidden"
                     onClick={()=>{
                      if(showSelected){
                        setLesson(item);
                        setIsOpen(true);
                      }
                     }}
                     >
                    {item?.description}
                  </span>
                </div>
                <div className="w-full md:w-[170px]  md:text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // ⛔ Prevent <li> click from firing
                      if (showSelected) {
                        SetSelectedLesson(item);
                      } else {
                        router.push(`/teacher/${slug}#calendar`);
                      }
                    }}
                    className="z-[100] cursor-pointer text-center inline-block bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-[#CC2828] text-base xl:text-lg font-semibold font-inter block px-4 lg:px-5 lg:px-6 py-2.5 rounded-full"
                  >
                    {formatMultiPrice(item?.price, "USD")}
                  </button>
                </div>
              </div>

            </li>

          ))}
        </ul>
        :
        <NoData Heading={"No lessons available"}
          content={"There are no lessons available on this account. Message the teacher if you think it is a mistake."}
        />)
      }
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


    </>
  );
}
