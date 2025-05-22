import React, { useEffect, useState } from "react";
import NoData from "../common/NoData";


export default function LessonList({ lessons, showSelected, selectedLesson, SetSelectedLesson}) {
  return (
    <>
    {lessons && lessons?.length>0 ? 
    <ul className="space-y-5 lg:space-y-5">
      {lessons?.map((item, index) => (
          <li
            key={index}
            className={`bg-white rounded-[10px] ${showSelected && selectedLesson?._id == item?._id ? "border border-[#CC2828]" : "border border-white"} lg:rounded-[20px] p-5 lg:p-6 xl:p-10`}
            onClick={()=>{
                if(showSelected){SetSelectedLesson(item);}
            }}
          >
            <h3 className="text-[#CC2828] tracking-[-0.04em] text-xl lg:text-2xl xl:text-[30px] font-inter font-extrabold mb-3 md:mb-4 lg:mb-6 capitalize">
              {item?.title} - {item?.duration} minutes
            </h3>
            <div className="flex flex-wrap ">
              <div className="mb-3 md:mb-0 w-full md:w-[calc(100%-170px)] md:pr-5">
                <span className="bg-[rgba(204,40,40,0.1)] text-[#CC2828] text-base xl:text-lg font-semibold font-inter inline-block px-4 lg:px-5 lg:px-6 py-2.5 rounded-[20px] lg:rounded-full tracking-[-0.04em]">
                  {item?.description}
                </span>
              </div>
              <div className="w-full md:w-[170px]  md:text-right">
                <button className="text-center inline-block bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-[#CC2828] text-base xl:text-lg font-semibold font-inter block px-4 lg:px-5 lg:px-6 py-2.5 rounded-full ">
                  USD ${item?.price}
                </button>
              </div>
            </div>
          </li>
        ))}
    </ul>
    :
    <NoData Heading={"No lessons available"} 
    content={"There are no lessons available on this account. Message the teacher if you think it is a mistake."}
    />
    }
    </>
  );
}
