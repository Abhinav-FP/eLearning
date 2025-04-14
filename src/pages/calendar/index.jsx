import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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
const Index = () => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const data = [
            {
                id: 1,
                name: 'Booked By You',
                startTime: '2025-04-14T08:00:00',
                endTime: '2025-04-14T08:30:00',
                bookingStatus: 'bookedbyyou',
            },
            {
                id: 2,
                name: 'Blocked',
                startTime: '2025-04-14T10:30:00',
                endTime: '2025-04-14T11:00:00',
                bookingStatus: 'blocked',
            },
            {
                id: 3,
                name: 'Booked',
                startTime: '2025-04-14T12:00:00',
                endTime: '2025-04-14T12:50:00',
                bookingStatus: 'booked',
            },
            {
                id: 4,
                name: 'Booked by you',
                startTime: '2025-04-14T14:00:00',
                endTime: '2025-04-14T15:00:00',
                bookingStatus: 'bookedByYou',
            },
        ];

        const mappedEvents = data.map((event) => {
            let color = '#90EE90'; // Default: Available

            if (event.bookingStatus === 'booked') {
                color = '#B0B0B0';
            } else if (event.bookingStatus === 'blocked') {
                color = '#EDEDED';
            } else if (event.bookingStatus === 'bookedByYou') {
                color = '#A4C639';
            }

            return {
                ...event,
                title: event.name,
                start: new Date(event.startTime),
                end: new Date(event.endTime),
                color,
            };
        });

        setEvents(mappedEvents);
    }, []);




    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedSlot(null);
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

    return (
        <div className="md:flex flex-wrap  bg-[#F5F6FB] items-start">


            {/* right sidebar  */}
            <div className="w-full lg:w-[calc(100%-304px)]">
                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] mb-[30px]">
                        <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
                                    <span className="text-sm text-gray-700">Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-gray-200 inline-block"></span>
                                    <span className="text-sm text-gray-700">Not Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-gray-400 inline-block"></span>
                                    <span className="text-sm text-gray-700">Booked</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#A4C639] inline-block"></span>
                                    <span className="text-sm text-gray-700">Booked by You</span>
                                </div>
                            </div>
                            <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] m-0 tracking-[-0.03em]">Staff Calendar</h3>
                        </div>
                        <div className="p-4 relative">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                defaultView={Views.WEEK}
                                views={[Views.WEEK]}
                                step={30}
                                timeslots={1}
                                style={{
                                    height: '600px',
                                    width: '100%',
                                }}
                                selectable
                                eventPropGetter={eventStyleGetter}
                                components={{ event: Event }}
                                onSelectSlot={(slotInfo) => {
                                    if (!events.some(event =>
                                        moment(event.start).isSame(slotInfo.start) &&
                                        moment(event.end).isSame(slotInfo.end)
                                    )) {
                                        handleSelectSlot(slotInfo);
                                    }
                                }}
                            />
                            {isPopupOpen && selectedSlot && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-10">
                                    <h2 className="text-lg font-semibold mb-2">New Appointment</h2>
                                    <p>Start Time: {moment(selectedSlot.start).format('MMMM D, YYYY hh:mm A')}</p>
                                    <p>End Time: {moment(selectedSlot.end).format('MMMM D, YYYY hh:mm A')}</p>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2" onClick={() => {
                                        // Implement your logic to create a new appointment here
                                        const newEvent = {
                                            id: Date.now(), // Temporary ID
                                            title: "New Booking",
                                            start: selectedSlot.start,
                                            end: selectedSlot.end,
                                            allDay: false,
                                            color: 'green',
                                            bookingStatus: 'available', // Or 'booked' depending on your logic
                                            UserName: "New User" // You'll likely get this from input
                                        };
                                        setEvents([...events, newEvent]);
                                        handleClosePopup();
                                    }}>Create Booking</button>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4" onClick={handleClosePopup}>Cancel</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;