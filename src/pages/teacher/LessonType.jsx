import React from "react";
import { formatMultiPrice } from "@/components/ValueDataHook";
import toast from "react-hot-toast";

export default function LessonType({selectedLesson, multipleLessons, setMultipleLessons, lessonType, setLessonType, bulkBookingAllowed}) {
  // console.log("selectedLesson", selectedLesson);
  // console.log("multipleLessons", multipleLessons);
  // console.log("lessonType", lessonType);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`bg-white border rounded-[20px] p-6 
          ${lessonType === "single" ? "border-[#55844D]" : "border-[#55844D]/20"} 
          hover:border-[#55844D] transition cursor-pointer`}
          onClick={()=>{
            setLessonType("single");
          }}>
          <h3 className="text-[#55844D] font-extrabold text-xl mb-3 tracking-[-0.04em]">
            Single Lesson
          </h3>
          <p className="text-gray-700 mb-5 text-base">
            Pay per lesson — perfect if you want to try one session.
          </p>
          <div className="">
            <span className="text-[#55844D] text-2xl font-bold">
              {formatMultiPrice(selectedLesson?.price, "USD")}
            </span>
          </div>
        </div>
        <div className={`bg-white border rounded-[20px] p-6 transition
            ${bulkBookingAllowed
              ? `
                cursor-pointer
                hover:border-[#55844D]
                ${lessonType === "multiple" ? "border-[#55844D]" : "border-[#55844D]/20"}
              `
              : `
                opacity-60
                cursor-not-allowed
                border-[#55844D]/20
                pointer-events-none
              `}
          `}
           onClick={()=>{
            if (!bulkBookingAllowed) return;
            setLessonType("multiple");
           }}>
          <h3 className="text-[#55844D] font-extrabold text-xl mb-3 tracking-[-0.04em]">
            Multiple Lessons
          </h3>
          <p className="text-gray-700 text-base mb-5">
            Choose the number of lessons you want to buy in advance.
          </p>
          <div className="mb-5">
            <label className="block text-sm font-medium text-[#55844D] mb-2">
              Number of Lessons (minimum 2)
            </label>
            <input
              type="text"
              value={multipleLessons}
              disabled={!bulkBookingAllowed}
              onChange={(e) => {
              if (!bulkBookingAllowed) return;
              if (/^[0-9]*$/.test(e.target.value)){
                if(Number(e.target.value) > 10){
                  toast.error("You can buy up to 10 lessons only");
                  return;
                }
                setMultipleLessons(Number(e.target.value))
              }
            }}
              className={`w-full border rounded-lg px-4 py-2
                ${bulkBookingAllowed
                  ? "border-[#55844D]/40 focus:outline-none focus:ring-2 focus:ring-[#55844D]"
                  : "border-gray-300 bg-gray-100 cursor-not-allowed"
                }`}
              placeholder="Enter number of lessons"
            />
          </div>
          <div className="text-right">
            <span className="text-[#55844D] text-lg font-semibold">
              {formatMultiPrice((selectedLesson?.price*multipleLessons) || 0, "USD")}
            </span>
          </div>
          {!bulkBookingAllowed && (
            <p className="text-sm text-red-500 mt-3">
              Bulk bookings are disabled by the teacher
            </p>
          )}
        </div>
      </div>
    </div>
  );
}