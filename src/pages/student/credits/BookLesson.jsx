import React, { useEffect, useState } from "react";
import Popup from "@/pages/common/Popup";
import Heading from "@/pages/common/Heading";
import Listing from "@/pages/api/Listing";
import RescheduleCalendar from "../lessons/RescheduleCalendar";
import toast from "react-hot-toast";

export default function BookLesson({ isOpen, onClose, selectedItem, studentTimeZone, fetchdata }) {
  // console.log("selectedItem", selectedItem);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [mergedAvailability, setMergedAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const [endTime, setEndTime] = useState(null);
  
  const addDurationToDate = (start, durationInMinutes) => {
    const originalDate = new Date(start);
    const finalDate = new Date(originalDate.getTime() + durationInMinutes * 60000);
    const isStringInput = typeof start === 'string';
    if (!isStringInput) return finalDate;
    const localeString = originalDate.toLocaleString(undefined, {
      timeZoneName: 'short',
      hour12: false
    });
    const timezoneAbbreviation = localeString.split(' ').pop();
    const formatted = finalDate.toLocaleString(undefined, {
      timeZoneName: 'short',
      hour12: false
    });

    return formatted.replace(/GMT[^\s]+|[A-Z]{2,5}$/, timezoneAbbreviation);
  };

  useEffect(() => {
    if (selectedSlot) {
      const time = addDurationToDate(selectedSlot?.start, selectedItem?.LessonId?.duration);
      setEndTime(time);
    }
  }, [selectedSlot])

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

  const fetchAvailabilitys = async (selectedItem) => {
    try {
      const main = new Listing();
      const response = await main.studentteacherAvaliability(selectedItem?.teacherId?._id);
      if (response.data) {
        const availabilityBlocks = response.data.data.availabilityBlocks || [];

        // Sort by start time
        const sorted = [...availabilityBlocks].sort(
          (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)
        );

        // Merge continuous slots
        const merged = [];
        for (let i = 0; i < sorted.length; i++) {
          const current = sorted[i];
          if (
            merged.length > 0 &&
            merged[merged.length - 1].endDateTime === current.startDateTime
          ) {
            // Extend the previous block
            merged[merged.length - 1].endDateTime = current.endDateTime;
          } else {
            // Start a new block
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
    if (selectedItem) {
      fetchAvailabilitys(selectedItem);
    }
  }, [selectedItem]);

  const handleSubmit = async (e) => {
    if (loading) return;
    setLoading(true);
    try {
      const main = new Listing();
      console.log("selectedSlot?.start", selectedSlot?.start);
      console.log("endTime", endTime);
      const response = await main.BulkLessonRedeem({
        id: selectedItem?._id,
        startDateTime: selectedSlot?.start,
        endDateTime: endTime,
        timezone: studentTimeZone || "UTC",
      });
      if (response?.data?.status) {
        toast.success(response.data.message);
        fetchdata();
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
            selectedLesson={selectedItem?.LessonId}
            mergedAvailability={mergedAvailability}
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
                    selectedItem?.LessonId?.duration
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
                      ${!selectedSlot ? "cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              {loading ? "Saving" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}
