import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const Event = ({ event }) => {
    const formattedStartTime = moment(event.start).format('hh:mm A');
    const formattedEndTime = moment(event.end).format('hh:mm A');
    const eventStyle = {
        backgroundColor: event.color, // Apply color based on booking status
        borderRadius: '5px',
        color: 'white',
        padding: '2px',
        overflow: 'auto',
        maxHeight: '80px',
    };

    return (
        <div className="p-1" style={eventStyle}>
            <p className="text-[12px] text-center">{`${formattedStartTime} - ${formattedEndTime}`}</p>
            <p className="text-white text-[10px]  text-center">
                {event.title} <span className='font-semibold ml-1 text-black'>
                    ({event.UserName})
                </span>
            </p>
        </div>
    );
};

const Index = () => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const staffList = [
        {
            id: 3,
            appointment_date: "2025-04-15", // Tuesday
            appointment_time: "09:00 AM",
            end_appointment_time: "09:30 AM",
            serviceCategoryName: "Facial",
            staffName: "John Doe",
            userName: "Charlie Brown",
            bookingStatus: 'booked', // 'booked', 'available', 'blocked'
        },
        {
            id: 4,
            appointment_date: "2025-04-15", // Tuesday
            appointment_time: "09:30 AM",
            end_appointment_time: "10:00 AM",
            serviceCategoryName: "Massage",
            staffName: "Jane Smith",
            userName: "Lucy Van Pelt",
            bookingStatus: 'available',
        },
        {
            id: 5,
            appointment_date: "2025-04-17", // Thursday
            appointment_time: "11:00 AM",
            end_appointment_time: "11:30 AM",
            serviceCategoryName: "Haircut",
            staffName: "John Doe",
            userName: "Schroeder",
            bookingStatus: 'blocked',
        },
        // Add more static appointments for the current week
    ];

    useEffect(() => {
        if (staffList && staffList?.length > 0) {
            const transformedEvents = staffList.map((staff) => {
                const startDate = moment(staff?.appointment_date).format('YYYY-MM-DD');
                const startTime = staff?.appointment_time;
                const endTime = staff?.end_appointment_time;
                const startDateTime = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD hh:mm A').toDate();
                const endDateTime = moment(`${startDate} ${endTime}`, 'YYYY-MM-DD hh:mm A').toDate();
                let color = 'green'; // Default to green (available)
                if (staff.bookingStatus === 'booked') {
                    color = 'red';
                } else if (staff.bookingStatus === 'blocked') {
                    color = 'yellow';
                }
                return {
                    id: staff.id,
                    title: "Ankit", // Static title as requested
                    start: startDateTime,
                    end: endDateTime,
                    staffName: `${staff?.staff?.name}`,
                    UserName: `${staff?.userName}`, // Corrected typo
                    allDay: false,
                    color: color, // Add color property
                    bookingStatus: staff.bookingStatus, // Keep track of booking status
                };
            });
            setEvents(transformedEvents);
        }
    }, [staffList]);

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedSlot(null);
    };

    return (
        <div className="md:flex flex-wrap  bg-[#F5F6FB] items-start">
            {/* right sidebar  */}
            <div className="w-full lg:w-[calc(100%-304px)]">
                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] mb-[30px]">
                        <div className="py-3 py-4 lg:py-[23px] px-4 md:px-6 lg:px-10 flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
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