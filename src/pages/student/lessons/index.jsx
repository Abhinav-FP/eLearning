import React, { useEffect, useState } from "react";
import StudentLayout from "../Common/StudentLayout";
import Image from "next/image";
import Listing from "@/pages/api/Listing";
import Link from "next/link";
import ReschedulePopup from "./ReschedulePopup";
import { LessonLoader } from "@/components/Loader";
import NoData from "@/pages/common/NoData";

export default function Index() {
  const [tab, setTab] = useState("upcoming");
  const[selectedLesson,setSelectedLesson] = useState(null);
  const[loading,setLoading]=useState(false)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const [categorizedLessons, setCategorizedLessons] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);    
  const [studentTimeZone, setStudentTimeZone]=useState(null);
  
    // Get timezone
    useEffect(() => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      setStudentTimeZone(timeZone);
    }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.GetBooking();
      const allLessons = response?.data?.data || [];
  
      const now = new Date();
      const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
      const categorized = {
        upcoming: [],
        past: [],
        cancelled: [],
      };
  
      allLessons.forEach(lesson => {
        const start = new Date(lesson.startDateTime);
        const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  
        if (lesson.cancelled) {
          categorized.cancelled.push(lesson);
        } else if (startDateOnly >= nowDateOnly) {
          categorized.upcoming.push(lesson);
        } else {
          categorized.past.push(lesson);
        }
      });
      setLoading(false);  
      setCategorizedLessons(categorized);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setCategorizedLessons({
        upcoming: [],
        past: [],
        cancelled: [],
      });
    }
  };  

  useEffect(() => {
      fetchLessons();
  }, []);

  const isMoreThanOneHourFromNow = (startDateTime) => {
  const now = new Date();
  const start = new Date(startDateTime);
  const diffInMs = start - now;
  const oneHourInMs = 60 * 60 * 1000;

  return diffInMs > oneHourInMs;
};
  // console.log("categorizedLessons", categorizedLessons);

  return (
    <StudentLayout page={"My Lessons"}>
      <div className="min-h-screen  py-5 lg:py-[30px]">
        <div className="px-5 lg:px-[30px]">
          <h1 className="font-inter text-lg lg:text-xl xl:text-3xl font-bold text-[#CC2828] tracking-[-0.04em] mb-1 lg:mb-3 xl:mb-5">
            Stay on Track with Your Lessons
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex px-5 lg:px-[30px] flex-wrap gap-6 sm:gap-16 lg:gap-12 xl:gap-28 border-b border-[rgba(0,0,0,0.2)] mb-6">
          {["Upcoming", "Past", "Cancelled"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item.toLowerCase())}
              className={`py-3 font-inter px-2 rounded-b rounded-b-sm text-sm lg:text-base font-medium tracking-[-0.04em] cursor-pointer relative after:absolute after:left-0 after:right-0 after:h-[5px] after:bottom-0 after:rounded-md ${tab === item.toLowerCase()
                  ? "text-[#CC2828] after:bg-[#CC2828]"
                  : "text-[#535353]  hover:text-[#CC2828] hover:after:bg-[#CC2828]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Lesson Cards */}
        <div className="space-y-4 lg:space-y-5  px-5 lg:px-[30px]">
          {loading ? 
           <>
          {[1, 2, 3].map((index) => (
            <LessonLoader key={index} />
          ))}
        </>
          : 
        (categorizedLessons[tab]?.length ? (
            categorizedLessons[tab].map((lesson, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 xl:gap-4 flex-wrap mb-3 lg:mb-4 xl:mb-5">
                  <p className="text-[#CC2828] font-bold text-lg xl:text-xl font-inter">
                    {lesson?.startDateTime ? new Date(lesson.startDateTime).toLocaleDateString('en-US', dateOptions) : ""}
                  </p>
                  <p className="text-sm lg:text-base font-medium text-[#535353] font-inter ">
                    {lesson?.startDateTime ? new Date(lesson.startDateTime).toLocaleTimeString('en-US', timeOptions) : ""}
                  </p>
                  <p className="text-sm lg:text-base font-medium text-[#535353] font-inter ">{lesson?.LessonId?.duration ? `${lesson?.LessonId?.duration} minutes` : ""}</p>
                </div>
                <div
                  className="bg-white rounded-[10px] lesson_list_shadow p-3 md:p-4 lg:p-5 flex items-center justify-between transition border-[rgba(204,40,40,0.2)] border-1"
                >
                  <div className="flex items-center space-x-2.5 lg:space-x-3">
                    <Image
                      src={lesson?.teacherId?.profile_photo || "/profile.png"}
                      alt="Profile"
                      className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover"
                      height={44}
                      width={44}
                    />
                    <div>
                      <p className="text-sm font-inter font-medium text-black tracking-[-0.06em]">
                        {lesson?.teacherId?.name || ""}
                      </p>
                      <p className="text-xs font-inter text-[#7A7A7A] tracking-[-0.04em]">Teacher</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 xl:gap-5">
                    {tab === "upcoming" && isMoreThanOneHourFromNow(lesson?.startDateTime) &&
                    <button className="tracking-[-0.06em] font-inter px-6 md:px-10 lg:px-12 xl:px-16 py-2 lg:py-2.5 text-[#CC2828] border border-[#CC2828] rounded-[10px]  text-sm hover:bg-[#CC2828] hover:text-white cursor-pointer"
                    onClick={()=>{
                      setSelectedLesson(lesson);
                      setIsPopupOpen(true);
                    }}>
                      Reschedule
                    </button> }
                    <Link href={`/student/message?query=${lesson?.teacherId?._id}`} className="tracking-[-0.06em] font-inter px-6 md:px-10 lg:px-12 xl:px-16 py-2 lg:py-2.5 text-white border border-[#CC2828] rounded-[10px]  text-sm bg-[#CC2828] hover:bg-white hover:text-[#CC2828] cursor-pointer">
                      Message
                    </Link>
                  </div>
                </div>
              </div>
           ))) : (
            // <p className="text-gray-500">No {tab} lessons found.</p>
            <NoData Heading={`No ${tab} Bookings available`}/>
          ))}
        </div>
      </div>
      <ReschedulePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        lesson={selectedLesson}
        studentTimeZone={studentTimeZone}
        fetchLessons={fetchLessons}
      />
    </StudentLayout>
  );
}
