import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
// moment.tz.setDefault("UTC");
// import "../../styles/calendar.css"
import Popup from "../common/Popup";
import PayPalButton from "../payment/index";
import Stripe from "../stripe/Stripe";
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
const Index = ({ Availability, setIsPopupOpen, usedInPopup, setSelectedSlot, selectedLesson }) => {
  const [events, setEvents] = useState([]);
  const { user } = useRole();
  const router = useRouter();

  console.log("Availability", Availability);
  // console.log("events",events);

  useEffect(() => {
    if (!Availability) return;
  
    const getNextQuarter = (date) => {
      const next = new Date(date);
      const minutes = next.getMinutes();
      const add =
        minutes < 15
          ? 15 - minutes
          : minutes < 30
          ? 30 - minutes
          : minutes < 45
          ? 45 - minutes
          : 60 - minutes;
      next.setMinutes(minutes + add, 0, 0);
      return next;
    };
  
    const processBlocks = (blocks, title, color) => {
      const events = [];
  
      blocks.forEach((block) => {
        let current = moment.utc(block.startDateTime).toDate();
        const end = moment.utc(block.endDateTime).toDate();
  
        const firstChunkEnd = getNextQuarter(current);
        const firstDuration = (firstChunkEnd - current) / (1000 * 60); // in minutes
  
        if (firstChunkEnd > end) {
          // entire block fits before the first rounded quarter
          events.push({
            id: `${block._id}_${block.startDateTime}`,
            title,
            start: moment.utc(current).toDate(),
            end: moment.utc(end).toDate(),
            color,
          });
          return;
        }
  
        if (firstDuration < 15) {
          // merge first chunk with next
          const secondChunkEnd = getNextQuarter(firstChunkEnd);
          const mergedEnd = secondChunkEnd < end ? secondChunkEnd : end;
  
          events.push({
            id: `${block._id}_${block.startDateTime}`,
            title,
            start: moment.utc(current).toDate(),
            end: moment.utc(mergedEnd).toDate(),
            color,
          });
  
          current = new Date(mergedEnd);
        } else {
          // normal first chunk
          events.push({
            id: `${block._id}_${block.startDateTime}`,
            title,
            start: moment.utc(current).toDate(),
            end: moment.utc(firstChunkEnd).toDate(),
            color,
          });
  
          current = new Date(firstChunkEnd);
        }
  
        // rest of the chunks
        while (current < end) {
          const nextChunkEnd = getNextQuarter(current);
          const chunkEnd = nextChunkEnd < end ? nextChunkEnd : end;
  
          events.push({
            id: `${block._id}_${moment.utc(current).toISOString()}`,
            title,
            start: moment.utc(current).toDate(),
            end: moment.utc(chunkEnd).toDate(),
            color,
          });
  
          current = new Date(chunkEnd);
        }
      });
  
      return events;
    };
    // For processing full blocks
    const processFullBlocks = (blocks, title, color) => {
      return blocks.map((block) => ({
        id: `${block._id}_${block.startDateTime}`,
        title,
        start: moment.utc(block.startDateTime).toDate(),
        end: moment.utc(block.endDateTime).toDate(),
        color,
      }));
    };
  
    const availabilityEvents = Availability.availabilityBlocks?.length
      ? processBlocks(Availability.availabilityBlocks, "Available", "#6ABB52")
      : [];
  
    const bookedEvents = Availability.bookedSlots?.length
      ? processFullBlocks(Availability.bookedSlots, "Blocked", "#185abc")
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
  console.log("user",user);


  const handleClick = (event) => {
    if (!usedInPopup) {
      if (!user) {
        toast.error("Please login first");
        router.push(`/login?redirect=${router.asPath}`);
        return;
      }
      if (user?.role != "student") {
        toast.error("Only students can book lessons");
        return;
      }
      setIsPopupOpen(true);
    }
    else {
      if(!isEventWithinAvailability(event?.start, selectedLesson?.duration, Availability?.availabilityBlocks)){
        toast.error("This time slot is too short for your selected lesson duration.");
        return;
      }
      setSelectedSlot(event);
    }
  };
  // console.log("availability",Availability);

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
                <span className="w-3 h-3 rounded-full bg-[#D9D9D9] inline-block"></span>
                <span className="text-sm text-gray-700">Not Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#D9D9D9] inline-block"></span>
                <span className="text-sm text-gray-700">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#CC2828] inline-block"></span>
                <span className="text-sm text-gray-700">Booked by You</span>
              </div>
            </div>
            {!usedInPopup &&
              <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] m-0 tracking-[-0.03em]">
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className={
                    "font-medium cursor-pointer rounded-full py-2 px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-base w-full py-3.5"
                  }
                >
                  Book Slot
                </button>
              </h3>}
          </div>
          <div className="p-4 relative">
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
              style={{ height: "1000px", width: "100%" }}
              selectable
              eventPropGetter={eventStyleGetter}
              onSelectEvent={(event) => {
                if (event.title !== "Blocked") {
                  handleClick(event);
                }
              }}
              
              components={{ event: Event }}
              onSelectSlot={(slotInfo) => {
                const overlap = events.some(
                  (event) =>
                    moment(slotInfo.start).isBefore(event.end) &&
                    moment(slotInfo.end).isAfter(event.start)
                );
                if (!overlap && !usedInPopup) {
                  handleClick(slotInfo);
                }
              }}
            />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Index;
