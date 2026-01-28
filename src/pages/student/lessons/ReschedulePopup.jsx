import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Heading from "@/pages/common/Heading";
import Listing from "@/pages/api/Listing";
import RescheduleCalendar from "./RescheduleCalendar";
import toast from "react-hot-toast";
import moment from "moment";

export default function ReschedulePopup({ isOpen, onClose, lesson, studentTimeZone, setStudentTimeZone, fetchLessons }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [mergedAvailability, setMergedAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const [endTime, setEndTime] = useState(null);

  const addDurationToDate = (start, durationInMinutes) => {
    if (!start) return null;
    return moment(start).add(durationInMinutes, "minutes").toISOString();
  };

  useEffect(() => {
    if (selectedSlot) {
      const time = addDurationToDate(selectedSlot?.start, lesson?.LessonId?.duration);
      setEndTime(time);
    }
  }, [selectedSlot])

  function getFormattedEndTime(time, durationInMinutes) {
    if (!time) return "";
    const end = moment(time).add(durationInMinutes, "minutes");

    return end.format("MMM D, h:mm A"); // Example: "May 2, 7:40 PM"
  }

  const fetchAvailabilitys = async (lesson) => {
    try {
      const main = new Listing();
      const response = await main.studentteacherAvaliability(
        lesson?.teacherId?._id
      );

      if (response.data) {
        const availabilityBlocks =
          response.data.data.availabilityBlocks || [];

        // Sort using moment
        const sorted = [...availabilityBlocks].sort(
          (a, b) =>
            moment(a.startDateTime).valueOf() -
            moment(b.startDateTime).valueOf()
        );

        // Merge continuous blocks
        const merged = [];
        for (let i = 0; i < sorted.length; i++) {
          const current = sorted[i];

          if (
            merged.length > 0 &&
            moment(merged[merged.length - 1].endDateTime).isSame(
              moment(current.startDateTime)
            )
          ) {
            merged[merged.length - 1].endDateTime = current.endDateTime;
          } else {
            merged.push({ ...current });
          }
        }

        setAvailability(response.data.data);
        setMergedAvailability(merged);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // console.log("availability",availability);

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
            mergedAvailability={mergedAvailability}
            studentTimeZone={studentTimeZone}
            setStudentTimeZone={setStudentTimeZone}
          />
          <div className="flex justify-between items-center mt-5">
            <div></div>
            <div>
              {selectedSlot && (
                <p className="text-[#CC2828] capitalize text-base xl:text-lg font-semibold font-inter inline-block tracking-[-0.04em]">
                  Selected Time Slot –{" "}
                  {moment(selectedSlot.start).format("MMM D, h:mm A")} –{" "}
                  {getFormattedEndTime(
                    selectedSlot?.start,
                    lesson?.LessonId?.duration
                  )}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                handleSubmit();
              }}
              disabled={!selectedSlot}
              className={`font-medium rounded-full py-2 px-5 text-white text-base w-fit bg-[#CC2828] hover:bg-[#ad0e0e] 
                      ${!selectedSlot ? "cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}
