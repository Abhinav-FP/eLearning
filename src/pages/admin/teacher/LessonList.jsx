import React, { useState } from "react";
import { useRouter } from "next/router";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";
import ViewLesson from "@/pages/common/ViewLesson";
import { FaArchive } from "react-icons/fa";

export default function LessonList({ lessons }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [Lesson, setLesson] = useState(null);

  return (
    <>
      {lessons && lessons.length > 0 ? (
        <ul className="space-y-6">
          {lessons.map((item, index) => {
            const isDeleted = item?.is_deleted;

            return (
              <li
                key={index}
                className={`rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm transition-shadow duration-200 
                ${isDeleted ? "bg-gray-100 cursor-not-allowed opacity-70" : "bg-white cursor-pointer"}`}
                onClick={() => {
                  if (!isDeleted) {
                    setLesson(item);
                    setIsOpen(true);
                  }
                }}
              >
                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg md:text-xl xl:text-2xl font-bold font-inter tracking-tight capitalize 
                    ${isDeleted ? "text-gray-500 " : "text-[#CC2828]"}`}>
                    {item?.title} - {item?.duration} minutes
                  </h3>
                  {isDeleted && <FaArchive size={18} className="text-gray-500" />}
                </div>

                {/* Description & Price */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <span className={`text-base font-medium tracking-[-0.04em] px-5 py-1 leading-[40px] rounded-full line-clamp-1 overflow-hidden 
                    ${isDeleted
                      ? "bg-gray-200 text-gray-500"
                      : "bg-[rgba(204,40,40,0.1)] text-[#CC2828]"}`}>
                    {item?.description}
                  </span>

                  <button
                    className={`text-sm md:text-base lg:text-lg font-semibold px-6 py-2.5 rounded-full w-full md:w-auto text-center transition-all duration-200 
                      ${isDeleted
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "text-[#CC2828] bg-[#CC28281A] hover:bg-[#CC282820]"}`}
                    disabled
                  >
                    {formatMultiPrice(item?.price, "USD")}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <NoData
          Heading="No lessons available"
          content="There are no lessons available on this account. Message the teacher if you think it is a mistake."
        />
      )}

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
