import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Addavailablility from './Addavailablility';
import EditAvailablity from './EditAvailablity';
import toast from 'react-hot-toast';

const localizer = momentLocalizer(moment);

const Event = ({ event }) => {
  const formattedStartTime = moment(event.start).format('hh:mm A');
  const formattedEndTime = moment(event.end).format('hh:mm A');
  const eventStyle = {
    backgroundColor: event.color,
    borderRadius: '5px',
    color: 'white',
    padding: '4px',
    maxHeight: '80px',
    overflow: 'hidden',
    fontSize: '12px',
  };

  return (
    <div style={eventStyle}>
    </div>
  );
};

const Availablility = ({ Availability, TeacherAvailabilitys }) => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const closeAvailablility = () => setIsPopupOpen(false);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setIsPopupOpen(true);
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.9,
        color: '#000',
        border: '1px solid #ccc',
      },
    };
  };

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
        id: `${block._id}`,
        title,
        start: moment.utc(block.startDateTime).toDate(),
        end: moment.utc(block.endDateTime).toDate(),
        color,
      }));
    };

    const availabilityEvents = Availability.availabilityBlocks?.length
      ? processFullBlocks(Availability.availabilityBlocks, "Available", "#6ABB52")
      : [];

    const bookedEvents = Availability.bookedSlots?.length
      ? processFullBlocks(Availability.bookedSlots, "Blocked", "#8f97a3")
      : [];

    setEvents([...availabilityEvents, ...bookedEvents]);
  }, [Availability]);

  //Edit Avaiblitiy
  const [selectedEvent, setSelectedEvent] = useState(null);

  const closeModal = () => {
    setSelectedEvent(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="bg-white rounded-[20px] border-[#CC282880] border-1">
          <div className="py-4 lg:py-3 lg:py-[15px] px-2 md:px-4 lg:px-6 flex flex-wrap  flex-row justify-between items-center border-b border-[rgba(0,0,0,.1)]">
            <div className="flex flex-wrap items-center gap-2 md:gap-4  md:mb-0 ">
              <div className="flex items-center gap-1 md:gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6ABB52] inline-block"></span>
                <span className="text-sm text-gray-700">Available</span>
              </div>
              {/* <div className="flex items-center gap-1 md:gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#D9D9D9] inline-block"></span>
                                <span className="text-sm text-gray-700">Not Available</span>
                            </div> */}
              <div className="flex items-center gap-1 md:gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8f97a3] inline-block"></span>
                <span className="text-sm text-gray-700">Booked</span>
              </div>
              {/* <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#CC2828] inline-block"></span>
                                <span className="text-sm text-gray-700">Booked by You</span>
                            </div> */}
            </div>
            <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] m-0 tracking-[-0.03em]">
              <button
                onClick={() => { setIsPopupOpen(true); }}
                className="font-medium cursor-pointer rounded-full px-3 md:px-5 text-[#ffffff] bg-[#CC2828] hover:bg-[#ad0e0e] text-sm sm:text-base w-full py-2.5 lg:py-3.5"
              >
                Add Availablility
              </button>
            </h3>
          </div>
          <div className="pt-3 px-2 pb-3 lg:p-4 relative">
            <Calendar
              localizer={localizer}
              events={events}
              defaultDate={new Date()}
              startAccessor="start"
              endAccessor="end"
              defaultView={Views.WEEK}
              views={[Views.WEEK]}
              date={currentDate}
              onNavigate={date => setCurrentDate(date)}
              step={30}
              timeslots={1}
              style={{ height: '1000px', width: '100%' }}
              selectable
              eventPropGetter={eventStyleGetter}
              components={{ event: Event }}
              onSelectEvent={(event) => {
                if (!event?.id || event?.id === "undefined") {
                  toast.error("Slots having a booking are not editable");
                  return;
                }
                setSelectedEvent(event)
              }}
              onSelectSlot={(slotInfo) => {
                const overlap = events.some(event =>
                  moment(slotInfo.start).isBefore(event.end) &&
                  moment(slotInfo.end).isAfter(event.start)
                );
                if (!overlap) {
                  handleSelectSlot(slotInfo);
                }
              }}
            />
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <Addavailablility
          isOpen={isPopupOpen}
          onClose={closeAvailablility}
          TeacherAvailabilitys={TeacherAvailabilitys}
          selectedSlot={selectedSlot}
        />
      )}

      {selectedEvent && (
        <EditAvailablity
          selectedEvent={selectedEvent}
          isOpen={selectedEvent}
          TeacherAvailabilitys={TeacherAvailabilitys}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Availablility;
