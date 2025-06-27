import React, { useState } from "react";
import { useRouter } from "next/router";
import NoData from "@/pages/common/NoData";
import { formatMultiPrice } from "@/components/ValueDataHook";
import ViewLesson from "@/pages/common/ViewLesson";

export default function LessonList({ lessons }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [Lesson, setLesson] = useState(null);

  console.log("lessons", lessons)
  return (
    <>
      {lessons && lessons.filter(l => !l.is_deleted).length > 0 ? (
        <ul className="space-y-6">
          {lessons
            .filter(item => !item.is_deleted)
            .map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm transition-shadow duration-200 cursor-pointer"
                onClick={() => {
                  setLesson(item);
                  setIsOpen(true);
                }}
              >
                <h3 className="text-[#CC2828] text-lg md:text-xl xl:text-2xl font-bold font-inter mb-4 tracking-tight capitalize">
                  {item?.title} - {item?.duration} minutes
                </h3>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <span className="text-base text-[#CC2828]
              bg-[rgba(204,40,40,0.1)] font-medium tracking-[-0.04em] 
              px-5 leading-[40px] py-1 rounded-full line-clamp-1 overflow-hidden">
                    {item?.description}
                  </span>

                  <button
                    className="text-[#CC2828] bg-[#CC28281A] text-sm md:text-base lg:text-lg font-semibold px-6 py-2.5 rounded-full w-full md:w-auto text-center hover:bg-[#CC282820] transition-all duration-200"
                    disabled
                  >
                    {formatMultiPrice(item?.price, "USD")}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <NoData
          Heading="No lessons available"
          content="There are no lessons available on this account. Message the teacher if you think it is a mistake."
        />
      )}

      <>
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
    </>
  );
}
