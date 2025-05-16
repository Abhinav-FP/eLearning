import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Heading from "@/pages/common/Heading";
import Listing from "@/pages/api/Listing";
import RescheduleCalendar from "./RescheduleCalendar";
import toast from "react-hot-toast";

export default function ReschedulePopup({ isOpen, onClose, lesson, studentTimeZone, fetchLessons }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availability,setAvailability] = useState(null);
  const[loading,setLoading]=useState(false);
  // console.log("lesson",lesson);
  // console.log("selectedSlot",selectedSlot);
  const[endTime,setEndTime] = useState(null);
  // console.log("endTime",endTime);
  
    const addDurationToDate = (start, durationInMinutes) => {
      // console.log("start",start);
      // console.log("duration",durationInMinutes);
      const originalDate = new Date(start);
      const finalDate = new Date(originalDate.getTime() + durationInMinutes * 60000);
    
      // Detect if input was a string with timezone (for matching formatting)
      const isStringInput = typeof start === 'string';
    
      // If it was a Date object, return Date object
      if (!isStringInput) return finalDate;
    
      // Match the original locale and timezone style using toLocaleString
      const localeString = originalDate.toLocaleString(undefined, {
        timeZoneName: 'short',
        hour12: false
      });
    
      const timezoneAbbreviation = localeString.split(' ').pop();
    
      const formatted = finalDate.toLocaleString(undefined, {
        timeZoneName: 'short',
        hour12: false
      });
    
      // Replace new abbreviation with old one (preserves input tz style)
      return formatted.replace(/GMT[^\s]+|[A-Z]{2,5}$/, timezoneAbbreviation);
    };
  
    useEffect(()=>{
      if(selectedSlot){
        const time = addDurationToDate(selectedSlot?.start, lesson?.LessonId?.duration);
        setEndTime(time);
      }
    },[selectedSlot])

  function getFormattedEndTime(time, durationInMinutes) {
    const start = new Date(time);
    const end = new Date(start.getTime() + durationInMinutes * 60000);

    const options = {
      month: "short", // e.g. "May"
      day: "numeric", // e.g. "2"
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return end.toLocaleString("en-US", options); // → "May 2, 7:40 PM"
  }

  const fetchAvailabilitys = async (lesson) => {
    try {
      const main = new Listing();
      const response = await main.studentteacherAvaliability(lesson?.teacherId?._id);
    //   console.log("response", response);
      if (response.data) {
        setAvailability(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
//   console.log("availability",availability);

  useEffect(() => {
      if (lesson) {
        fetchAvailabilitys(lesson);
      }
    }, [lesson]);

    const handleSubmit = async (e) => {
        if (loading) return;
        setLoading(true);
        try {
          const main = new Listing();
          const response = await main.BookingUpdate(lesson?._id, {
            startDateTime: selectedSlot?.start,
            endDateTime: endTime,
            timezone: studentTimeZone || "UTC",
          });
          if (response?.data?.status) {
            toast.success(response.data.message);
            fetchLessons();
            onClose();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("API error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong!");
          setLoading(false);
        }
        setLoading(false);
      };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[90vw]"}>
      <div
        style={{ backgroundImage: "url('/leasson-bg.png')" }}
        className="bg-[rgba(249,190,191,.5)] bg-cover bg-center rounded-[20px] py-[40px] lg:py-[60px]"
      >
        <div className="container sm:container md:container lg:container xl:max-w-[1230px]  bg-[rgba(249,190,191, .1)] px-4 mx-auto">
          <Heading
            classess="text-[#CC2828] mb-6 lg:mb-8 text-center"
            title="Select your Lesson Start Time"
          />
          <RescheduleCalendar
            Availability={availability}
            setSelectedSlot={setSelectedSlot}
            selectedLesson={lesson?.LessonId}
          />
          <div className="flex justify-between items-center mt-5">
            <div></div>
            <div>
               {selectedSlot && (
                <p className="text-[#CC2828] capitalize text-base xl:text-lg font-semibold font-inter inline-block tracking-[-0.04em]">
                  Selected Time Slot -{" "}
                  {new Date(selectedSlot.start).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  -
                  {getFormattedEndTime(
                    selectedSlot?.start,
                    lesson?.LessonId?.duration
                  )}{" "}
                </p>
              )} 
            </div>
            <button
              onClick={() => {
                handleSubmit();
              }}
              disabled={!selectedSlot}
              className={`font-medium rounded-full py-2 px-5 text-white text-base w-fit bg-[#CC2828] hover:bg-[#ad0e0e] 
                      ${
                        !selectedSlot ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}
