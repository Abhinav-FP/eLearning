import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import { useRole } from "@/context/RoleContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Event = ({ event }) => {
  const formattedStartTime = moment(event.start).format("hh:mm A");
  const formattedEndTime = moment(event.end).format("hh:mm A");
  const eventStyle = {
    backgroundColor: event.color,
    borderRadius: "5px",
    color: "white",
    padding: "4px",
    maxHeight: "80px",
    overflow: "hidden",
    fontSize: "12px",
  };

  return <div style={eventStyle}></div>;
};
const Index = ({ Availability, setIsPopupOpen, usedInPopup, setSelectedSlot, selectedLesson, mergedAvailability, teacherData }) => {
  const [events, setEvents] = useState([]);
  const { user } = useRole();
  const router = useRouter();
  // console.log("teacherData", teacherData);

  useEffect(() => {
    if (!Availability) return;

    const getNextHalfHour = (date) => {
      const next = new Date(date);
      const minutes = next.getMinutes();
      const add = minutes < 30 ? 30 - minutes : 60 - minutes;
      next.setMinutes(minutes + add, 0, 0);
      return next;
    };
    // For processing full blocks
    const processFullBlocks = (blocks, title, color) => {
      return blocks.map((block) => {
        let end = moment.utc(block.endDateTime);
        end = end.subtract(1, "seconds");
        return {
          id: `${block._id}`,
          title,
          start: moment.utc(block.startDateTime).toDate(),
          end: end.toDate(),
          color,
        };
      });
    };

    const availabilityEvents = Availability.availabilityBlocks?.length
      ? processFullBlocks(Availability.availabilityBlocks, "Available", "#6ABB52")
      : [];

    const bookedEvents = Availability.bookedSlots?.length
      ? processFullBlocks(Availability.bookedSlots, "Blocked", "#8f97a3")
      : [];

    setEvents([...availabilityEvents, ...bookedEvents]);
  }, [Availability]);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "5px",
        opacity: 0.9,
        color: "#000",
        border: "1px solid #ccc",
      },
    };
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  const isEventWithinAvailability = (eventStartLocal, durationInMinutes, availabilityList) => {
    const eventStart = new Date(eventStartLocal); // Local time
    const eventStartUTC = new Date(eventStart.toISOString()); // Accurate UTC time
    const eventEndUTC = new Date(eventStartUTC.getTime() + durationInMinutes * 60000);

    const isWithinSlot = availabilityList.some(slot => {
      const slotStart = new Date(slot.startDateTime); // Already in UTC
      const slotEnd = new Date(slot.endDateTime);
      return eventStartUTC >= slotStart && eventEndUTC <= slotEnd;
    });

    return isWithinSlot;
  };

  // console.log("availabilityBlocks",Availability);


  const handleClick = (event) => {
    if (!usedInPopup) {
      if (!user) {
        toast.error("Please login first");
        router.push(`/login?redirect=${router.asPath}`);
        return;
      }
      if (!user?.email_verify) {
        router.push("/verify");
        return;
      }
      if (user?.role != "student") {
        toast.error("Only students can book lessons");
        return;
      }
      setIsPopupOpen(true);
    }
    else {
      if (!isEventWithinAvailability(event?.start, selectedLesson?.duration, mergedAvailability)) {
        toast.error("This time slot is too short for your selected lesson duration.");
        return;
      }
      const startTime = moment(event.start);
      const now = moment();
      const diffInMinutes = startTime.diff(now, "minutes");
      if (diffInMinutes < 10) {
        toast.error("Cannot select a slot that starts in less than 10 minutes or is in the past.");
        return;
      }
      setSelectedSlot(event);
    }
  };


  return (
    <>
      <div className="w-full ">
        <div className="bg-white rounded-[20px]  border-[#CC282880] border-1">
          <div className="py-1 py-2 lg:py-[15px] px-2 md:px-3 lg:px-6 flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6ABB52] inline-block"></span>
                <span className="text-sm text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8f97a3] inline-block"></span>
                <span className="text-sm text-gray-700">Booked</span>
              </div>
            </div>
            {!usedInPopup &&
              <div className="flex  gap-2 text-base lg:text-lg font-semibold text-[#1E1E1E] m-0 tracking-[-0.03em] w-full md:w-auto">
                <button
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login first");
                      router.push(`/login?redirect=${router.asPath}`);
                      return;
                    }
                    if (user?.role != "student") {
                      toast.error("Only students can message teachers");
                      return;
                    }
                    router.push(`/student/message?query=${teacherData?.userId?._id}`);
                  }}
                  className={
                    "font-medium cursor-pointer rounded-full py-1.5 lg:py-3.5 px-3 sm:px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-sm sm:text-base md:w-full"
                  }
                >
                  Message
                </button>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className={
                    "font-medium cursor-pointer rounded-full py-1.5 lg:py-3.5 px-3 sm:px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-sm sm:text-base md:w-full"
                  }
                >
                  Book Slot
                </button>
              </div>}
          </div>
          <div className="p-4 relative">
            <div className="w-full overflow-x-auto  px-2 pb-4 ">
              <div className="min-w-[768px] md:min-w-full ">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView={Views.WEEK}
                  views={[Views.WEEK]}
                  date={currentDate}
                  onNavigate={(date) => setCurrentDate(date)}
                  step={30}
                  timeslots={1}
                  style={{
                     height: "75vh",
                    width: "100%",
                    fontSize: "14px",
                  }}
                  selectable
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event) => {
                    if (event?.title !== "Blocked") {
                      handleClick(event);
                    }
                  }}
                  components={{ event: Event }}
                  tooltipAccessor={null}
                  onSelectSlot={(slotInfo) => {
                    const overlap = events.some(
                      (event) =>
                        moment(slotInfo?.start).isBefore(event?.end) &&
                        moment(slotInfo?.end).isAfter(event?.start)
                    );
                    if (!overlap && !usedInPopup) {
                      handleClick(slotInfo);
                    }
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default Index;
